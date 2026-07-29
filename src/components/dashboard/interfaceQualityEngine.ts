/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import {
  DESIGN_SYSTEM_MANIFEST_SCHEMA_VERSION,
  type DesignSystemManifestV1,
  type InterfaceBlock,
  type InterfaceBreakpoint,
  type InterfaceManifestV2,
  type JsonValue,
  type SemanticColorTokens,
  type VisualRegressionBaseline,
  type VisualRegressionSnapshot,
  type VisualRegressionThemeMode,
} from './dashboardV2Types';
import {
  resolveLocalizedContent,
  resolveResponsiveInterface,
} from './interfaceStudioEngine';

type JsonRecord = Readonly<Record<string, unknown>>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isNumberInRange = (
  value: unknown,
  minimum: number,
  maximum: number,
): value is number => isFiniteNumber(value)
  && value >= minimum
  && value <= maximum;

const COLOR_KEYS = [
  'primary',
  'onPrimary',
  'accent',
  'onAccent',
  'background',
  'surface',
  'text',
  'textMuted',
  'border',
  'success',
  'warning',
  'error',
  'focus',
] as const satisfies readonly (keyof SemanticColorTokens)[];

const HEX_COLOR = /^#[0-9a-f]{6}$/iu;
const HTTPS_URL = /^https:\/\//iu;

export type DesignSystemImportIssueCode =
  | 'invalidJson'
  | 'invalidShape'
  | 'unsupportedVersion'
  | 'unknownProperty'
  | 'invalidValue'
  | 'emptyManifest';

export type DesignSystemImportIssue = {
  readonly code: DesignSystemImportIssueCode;
  readonly path: string;
};

export type DesignSystemImportResult =
  | {
      readonly ok: true;
      readonly manifest: DesignSystemManifestV1;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly DesignSystemImportIssue[];
    };

const validateKnownKeys = (
  value: JsonRecord,
  allowed: readonly string[],
  path: string,
  issues: DesignSystemImportIssue[],
): void => {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      issues.push({
        code: 'unknownProperty',
        path: path ? `${path}.${key}` : key,
      });
    }
  }
};

const validateColors = (
  value: unknown,
  path: string,
  issues: DesignSystemImportIssue[],
): void => {
  if (!isRecord(value)) {
    issues.push({ code: 'invalidShape', path });
    return;
  }
  validateKnownKeys(value, COLOR_KEYS, path, issues);
  for (const [key, color] of Object.entries(value)) {
    if (typeof color !== 'string' || !HEX_COLOR.test(color)) {
      issues.push({ code: 'invalidValue', path: `${path}.${key}` });
    }
  }
};

const validateSafeArea = (
  value: unknown,
  path: string,
  issues: DesignSystemImportIssue[],
): void => {
  if (!isRecord(value)) {
    issues.push({ code: 'invalidShape', path });
    return;
  }
  validateKnownKeys(value, ['top', 'right', 'bottom', 'left'], path, issues);
  for (const [key, amount] of Object.entries(value)) {
    if (!isNumberInRange(amount, 0, 120)) {
      issues.push({ code: 'invalidValue', path: `${path}.${key}` });
    }
  }
};

const validateResponsiveOverride = (
  value: unknown,
  path: string,
  issues: DesignSystemImportIssue[],
): void => {
  if (!isRecord(value)) {
    issues.push({ code: 'invalidShape', path });
    return;
  }
  validateKnownKeys(value, [
    'layout',
    'spacingScale',
    'borderRadius',
    'headingScale',
    'bodyScale',
  ], path, issues);
  if (
    value.layout !== undefined
    && value.layout !== 'card'
    && value.layout !== 'split'
    && value.layout !== 'fullscreen'
  ) {
    issues.push({ code: 'invalidValue', path: `${path}.layout` });
  }
  const numericRanges = {
    spacingScale: [0.5, 2],
    borderRadius: [0, 64],
    headingScale: [0.75, 2],
    bodyScale: [0.75, 2],
  } as const;
  for (const [key, [minimum, maximum]] of Object.entries(numericRanges)) {
    const item = value[key];
    if (
      item !== undefined
      && !isNumberInRange(item, minimum, maximum)
    ) {
      issues.push({ code: 'invalidValue', path: `${path}.${key}` });
    }
  }
};

const validateTheme = (
  value: unknown,
  issues: DesignSystemImportIssue[],
): void => {
  if (!isRecord(value)) {
    issues.push({ code: 'invalidShape', path: 'theme' });
    return;
  }
  validateKnownKeys(value, [
    'light',
    'dark',
    'typography',
    'controls',
    'borderRadius',
    'spacingScale',
    'elevation',
    'iconStyle',
    'motion',
    'branding',
    'safeAreas',
  ], 'theme', issues);
  if (value.light !== undefined) validateColors(value.light, 'theme.light', issues);
  if (value.dark !== undefined) validateColors(value.dark, 'theme.dark', issues);
  if (value.typography !== undefined) {
    if (!isRecord(value.typography)) {
      issues.push({ code: 'invalidShape', path: 'theme.typography' });
    } else {
      validateKnownKeys(value.typography, [
        'fontFamily',
        'headingScale',
        'bodyScale',
        'lineHeight',
      ], 'theme.typography', issues);
      if (
        value.typography.fontFamily !== undefined
        && (
          typeof value.typography.fontFamily !== 'string'
          || !value.typography.fontFamily.trim()
          || value.typography.fontFamily.length > 120
        )
      ) {
        issues.push({
          code: 'invalidValue',
          path: 'theme.typography.fontFamily',
        });
      }
      for (const key of ['headingScale', 'bodyScale', 'lineHeight'] as const) {
        const item = value.typography[key];
        if (item !== undefined && !isNumberInRange(item, 0.75, 2)) {
          issues.push({
            code: 'invalidValue',
            path: `theme.typography.${key}`,
          });
        }
      }
    }
  }
  if (value.controls !== undefined) {
    if (!isRecord(value.controls)) {
      issues.push({ code: 'invalidShape', path: 'theme.controls' });
    } else {
      validateKnownKeys(value.controls, [
        'height',
        'radius',
        'borderWidth',
      ], 'theme.controls', issues);
      const ranges = {
        height: [36, 80],
        radius: [0, 40],
        borderWidth: [0, 8],
      } as const;
      for (const [key, [minimum, maximum]] of Object.entries(ranges)) {
        const item = value.controls[key];
        if (
          item !== undefined
          && !isNumberInRange(item, minimum, maximum)
        ) {
          issues.push({
            code: 'invalidValue',
            path: `theme.controls.${key}`,
          });
        }
      }
    }
  }
  if (
    value.borderRadius !== undefined
    && !isNumberInRange(value.borderRadius, 0, 64)
  ) {
    issues.push({ code: 'invalidValue', path: 'theme.borderRadius' });
  }
  if (
    value.spacingScale !== undefined
    && !isNumberInRange(value.spacingScale, 0.5, 2)
  ) {
    issues.push({ code: 'invalidValue', path: 'theme.spacingScale' });
  }
  if (
    value.elevation !== undefined
    && value.elevation !== 'none'
    && value.elevation !== 'soft'
    && value.elevation !== 'raised'
  ) {
    issues.push({ code: 'invalidValue', path: 'theme.elevation' });
  }
  if (
    value.iconStyle !== undefined
    && value.iconStyle !== 'outline'
    && value.iconStyle !== 'filled'
    && value.iconStyle !== 'rounded'
  ) {
    issues.push({ code: 'invalidValue', path: 'theme.iconStyle' });
  }
  if (
    value.motion !== undefined
    && value.motion !== 'standard'
    && value.motion !== 'reduced'
  ) {
    issues.push({ code: 'invalidValue', path: 'theme.motion' });
  }
  if (value.branding !== undefined) {
    if (!isRecord(value.branding)) {
      issues.push({ code: 'invalidShape', path: 'theme.branding' });
    } else {
      validateKnownKeys(value.branding, [
        'logoLightUrl',
        'logoDarkUrl',
        'faviconUrl',
        'illustrationAssetId',
      ], 'theme.branding', issues);
      for (const key of ['logoLightUrl', 'logoDarkUrl', 'faviconUrl'] as const) {
        const item = value.branding[key];
        if (
          item !== undefined
          && (
            typeof item !== 'string'
            || (item !== '' && !HTTPS_URL.test(item))
          )
        ) {
          issues.push({
            code: 'invalidValue',
            path: `theme.branding.${key}`,
          });
        }
      }
      if (
        value.branding.illustrationAssetId !== undefined
        && typeof value.branding.illustrationAssetId !== 'string'
      ) {
        issues.push({
          code: 'invalidValue',
          path: 'theme.branding.illustrationAssetId',
        });
      }
    }
  }
  if (value.safeAreas !== undefined) {
    if (!isRecord(value.safeAreas)) {
      issues.push({ code: 'invalidShape', path: 'theme.safeAreas' });
    } else {
      validateKnownKeys(
        value.safeAreas,
        ['mobile', 'tablet', 'desktop'],
        'theme.safeAreas',
        issues,
      );
      for (const breakpoint of ['mobile', 'tablet', 'desktop'] as const) {
        if (value.safeAreas[breakpoint] !== undefined) {
          validateSafeArea(
            value.safeAreas[breakpoint],
            `theme.safeAreas.${breakpoint}`,
            issues,
          );
        }
      }
    }
  }
};

export const parseDesignSystemManifest = (
  source: string,
): DesignSystemImportResult => {
  let value: unknown;
  try {
    value = JSON.parse(source) as unknown;
  } catch {
    return {
      ok: false,
      issues: [{ code: 'invalidJson', path: '$' }],
    };
  }
  if (!isRecord(value)) {
    return {
      ok: false,
      issues: [{ code: 'invalidShape', path: '$' }],
    };
  }
  const issues: DesignSystemImportIssue[] = [];
  validateKnownKeys(value, [
    'schemaVersion',
    'name',
    'version',
    'layout',
    'theme',
    'responsiveOverrides',
  ], '', issues);
  if (value.schemaVersion !== DESIGN_SYSTEM_MANIFEST_SCHEMA_VERSION) {
    issues.push({
      code: 'unsupportedVersion',
      path: 'schemaVersion',
    });
  }
  for (const key of ['name', 'version'] as const) {
    if (
      typeof value[key] !== 'string'
      || !value[key].trim()
      || value[key].length > 80
    ) {
      issues.push({ code: 'invalidValue', path: key });
    }
  }
  if (
    value.layout !== undefined
    && value.layout !== 'card'
    && value.layout !== 'split'
    && value.layout !== 'fullscreen'
  ) {
    issues.push({ code: 'invalidValue', path: 'layout' });
  }
  validateTheme(value.theme, issues);
  if (value.responsiveOverrides !== undefined) {
    if (!isRecord(value.responsiveOverrides)) {
      issues.push({
        code: 'invalidShape',
        path: 'responsiveOverrides',
      });
    } else {
      validateKnownKeys(
        value.responsiveOverrides,
        ['mobile', 'tablet', 'desktop'],
        'responsiveOverrides',
        issues,
      );
      for (const breakpoint of ['mobile', 'tablet', 'desktop'] as const) {
        if (value.responsiveOverrides[breakpoint] !== undefined) {
          validateResponsiveOverride(
            value.responsiveOverrides[breakpoint],
            `responsiveOverrides.${breakpoint}`,
            issues,
          );
        }
      }
    }
  }
  if (
    isRecord(value.theme)
    && Object.keys(value.theme).length === 0
    && value.layout === undefined
    && (
      !isRecord(value.responsiveOverrides)
      || Object.keys(value.responsiveOverrides).length === 0
    )
  ) {
    issues.push({ code: 'emptyManifest', path: '$' });
  }
  if (issues.length > 0) return { ok: false, issues };
  return {
    ok: true,
    manifest: value as unknown as DesignSystemManifestV1,
    issues: [],
  };
};

const normalizeForHash = (value: unknown): JsonValue => {
  if (
    value === null
    || typeof value === 'string'
    || typeof value === 'boolean'
    || (typeof value === 'number' && Number.isFinite(value))
  ) {
    return value;
  }
  if (Array.isArray(value)) return value.map(normalizeForHash);
  if (!isRecord(value)) return String(value);
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, normalizeForHash(value[key])]),
  );
};

const stableStringify = (value: unknown): string =>
  JSON.stringify(normalizeForHash(value));

const hashValue = (value: unknown): string => {
  const source = stableStringify(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
};

export const applyDesignSystemManifest = (
  current: InterfaceManifestV2,
  imported: DesignSystemManifestV1,
  importedAt = new Date(),
): InterfaceManifestV2 => {
  const theme = imported.theme;
  return {
    ...current,
    ...(imported.layout ? { layout: imported.layout } : {}),
    responsiveOverrides: {
      ...(current.responsiveOverrides ?? {}),
      ...(imported.responsiveOverrides ?? {}),
    },
    designSystem: {
      name: imported.name,
      version: imported.version,
      format: 'identra-design-system-v1',
      importedAt: importedAt.toISOString(),
      sourceHash: hashValue(imported),
    },
    theme: {
      ...current.theme,
      ...(theme.light
        ? { light: { ...current.theme.light, ...theme.light } }
        : {}),
      ...(theme.dark
        ? { dark: { ...current.theme.dark, ...theme.dark } }
        : {}),
      ...(theme.typography
        ? {
            typography: {
              ...current.theme.typography,
              ...theme.typography,
            },
          }
        : {}),
      ...(theme.controls
        ? {
            controls: {
              ...current.theme.controls,
              ...theme.controls,
            },
          }
        : {}),
      ...(theme.borderRadius === undefined
        ? {}
        : { borderRadius: theme.borderRadius }),
      ...(theme.spacingScale === undefined
        ? {}
        : { spacingScale: theme.spacingScale }),
      ...(theme.elevation ? { elevation: theme.elevation } : {}),
      ...(theme.iconStyle ? { iconStyle: theme.iconStyle } : {}),
      ...(theme.motion ? { motion: theme.motion } : {}),
      ...(theme.branding
        ? {
            branding: {
              ...current.theme.branding,
              ...theme.branding,
            },
          }
        : {}),
      safeAreas: {
        mobile: {
          ...current.theme.safeAreas.mobile,
          ...theme.safeAreas?.mobile,
        },
        tablet: {
          ...current.theme.safeAreas.tablet,
          ...theme.safeAreas?.tablet,
        },
        desktop: {
          ...current.theme.safeAreas.desktop,
          ...theme.safeAreas?.desktop,
        },
      },
    },
  };
};

export type VisualRegressionContext = {
  readonly screenId: string;
  readonly variantId: string;
  readonly breakpoint: InterfaceBreakpoint;
  readonly themeMode: VisualRegressionThemeMode;
  readonly locale: Locale;
};

const localizedBlockContent = (
  block: InterfaceBlock,
  locale: Locale,
  defaultLocale: Locale,
): readonly string[] => {
  if (
    block.kind === 'heading'
    || block.kind === 'text'
    || block.kind === 'consent'
    || block.kind === 'credentialRequest'
    || block.kind === 'instruction'
    || block.kind === 'status'
  ) {
    return [
      resolveLocalizedContent(block.content, locale, defaultLocale).value,
    ];
  }
  if (block.kind === 'illustration') {
    return [
      resolveLocalizedContent(block.alt, locale, defaultLocale).value,
    ];
  }
  if (block.kind === 'actionGroup') {
    return block.actions.map(
      (action) => resolveLocalizedContent(
        action.label,
        locale,
        defaultLocale,
      ).value,
    );
  }
  return [];
};

const structureForBlock = (block: InterfaceBlock): JsonValue => {
  const base = {
    id: block.id,
    kind: block.kind,
    hidden: block.hidden,
    required: block.required,
    visibility: block.visibility ?? null,
    contentBinding: block.contentBinding ?? null,
  };
  switch (block.kind) {
    case 'heading':
      return { ...base, level: block.level };
    case 'illustration':
      return { ...base, source: block.source, value: block.value };
    case 'consent':
      return {
        ...base,
        scopeIds: block.scopeIds,
        consentRequired: block.consentRequired,
      };
    case 'credentialRequest':
      return { ...base, credentialType: block.credentialType };
    case 'fieldSummary':
      return { ...base, fields: block.fields };
    case 'instruction':
      return { ...base, mediaAssetId: block.mediaAssetId ?? null };
    case 'progress':
      return { ...base, mode: block.mode, value: block.value ?? null };
    case 'status':
      return { ...base, tone: block.tone };
    case 'actionGroup':
      return {
        ...base,
        actions: block.actions.map((action) => ({
          id: action.id,
          intent: action.intent,
        })),
      };
    case 'text':
      return base;
  }
};

export const createVisualRegressionSnapshot = (
  manifest: InterfaceManifestV2,
  context: VisualRegressionContext,
): VisualRegressionSnapshot | null => {
  const screen = manifest.screens.find(
    (candidate) => candidate.id === context.screenId,
  );
  const variant = screen?.variants.find(
    (candidate) => candidate.id === context.variantId,
  );
  if (!screen || !variant) return null;
  const responsive = resolveResponsiveInterface(
    manifest,
    context.breakpoint,
  );
  const layoutSignature = hashValue({
    layout: responsive.layout,
    spacingScale: responsive.spacingScale,
    borderRadius: responsive.borderRadius,
    safeArea: manifest.theme.safeAreas[context.breakpoint],
  });
  const themeSignature = hashValue({
    colors: manifest.theme[context.themeMode],
    typography: {
      ...manifest.theme.typography,
      headingScale: responsive.headingScale,
      bodyScale: responsive.bodyScale,
    },
    controls: manifest.theme.controls,
    elevation: manifest.theme.elevation,
    iconStyle: manifest.theme.iconStyle,
    motion: manifest.theme.motion,
    branding: manifest.theme.branding,
  });
  const structureSignature = hashValue({
    screenKind: screen.kind,
    state: variant.state,
    outcomes: variant.outcomes,
    blocks: variant.blocks.map(structureForBlock),
  });
  const contentSignature = hashValue(
    variant.blocks.flatMap(
      (block) => localizedBlockContent(
        block,
        context.locale,
        manifest.defaultLocale,
      ),
    ),
  );
  return {
    signature: hashValue({
      layoutSignature,
      themeSignature,
      structureSignature,
      contentSignature,
    }),
    layoutSignature,
    themeSignature,
    structureSignature,
    contentSignature,
  };
};

export type VisualRegressionChannel =
  | 'layout'
  | 'theme'
  | 'structure'
  | 'content';

export type VisualRegressionComparison =
  | {
      readonly status: 'passed';
      readonly changedChannels: readonly [];
    }
  | {
      readonly status: 'changed';
      readonly changedChannels: readonly VisualRegressionChannel[];
    }
  | {
      readonly status: 'missing';
      readonly changedChannels: readonly [];
    };

export const compareVisualRegressionSnapshot = (
  baseline: VisualRegressionSnapshot,
  current: VisualRegressionSnapshot | null,
): VisualRegressionComparison => {
  if (!current) return { status: 'missing', changedChannels: [] };
  if (baseline.signature === current.signature) {
    return { status: 'passed', changedChannels: [] };
  }
  const changedChannels: VisualRegressionChannel[] = [];
  if (baseline.layoutSignature !== current.layoutSignature) {
    changedChannels.push('layout');
  }
  if (baseline.themeSignature !== current.themeSignature) {
    changedChannels.push('theme');
  }
  if (baseline.structureSignature !== current.structureSignature) {
    changedChannels.push('structure');
  }
  if (baseline.contentSignature !== current.contentSignature) {
    changedChannels.push('content');
  }
  return { status: 'changed', changedChannels };
};

export const createVisualRegressionBaseline = (
  manifest: InterfaceManifestV2,
  context: VisualRegressionContext,
  options: {
    readonly id: string;
    readonly capturedAt: string;
  },
): VisualRegressionBaseline | null => {
  const snapshot = createVisualRegressionSnapshot(manifest, context);
  if (!snapshot) return null;
  return {
    id: options.id,
    capturedAt: options.capturedAt,
    ...context,
    snapshot,
  };
};

const visualBaselineContextKey = (
  baseline: Pick<
    VisualRegressionBaseline,
    'screenId' | 'variantId' | 'breakpoint' | 'themeMode' | 'locale'
  >,
): string => [
  baseline.screenId,
  baseline.variantId,
  baseline.breakpoint,
  baseline.themeMode,
  baseline.locale,
].join('\u0000');

export const upsertVisualRegressionBaseline = (
  baselines: readonly VisualRegressionBaseline[],
  baseline: VisualRegressionBaseline,
): readonly VisualRegressionBaseline[] => {
  const key = visualBaselineContextKey(baseline);
  const existingIndex = baselines.findIndex(
    (candidate) => visualBaselineContextKey(candidate) === key,
  );
  if (existingIndex < 0) return [...baselines, baseline];
  return baselines.map((candidate, index) =>
    index === existingIndex ? baseline : candidate);
};
