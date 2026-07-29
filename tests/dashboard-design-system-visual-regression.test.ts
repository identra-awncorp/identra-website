/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createEmptyWorkspaceV2,
  createFlowProjectV2,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  prepareDashboardWorkspaceForStorage,
} from '../src/components/dashboard/dashboardValidation.ts';
import {
  applyDesignSystemManifest,
  compareVisualRegressionSnapshot,
  createVisualRegressionBaseline,
  createVisualRegressionSnapshot,
  parseDesignSystemManifest,
  upsertVisualRegressionBaseline,
  type VisualRegressionContext,
} from '../src/components/dashboard/interfaceQualityEngine.ts';
import type {
  DesignSystemManifestV1,
  InterfaceBlock,
  InterfaceManifestV2,
} from '../src/components/dashboard/dashboardV2Types.ts';

const validDesignSystem: DesignSystemManifestV1 = {
  schemaVersion: 1,
  name: 'Synthetic trust design',
  version: '2.4.0',
  layout: 'split',
  theme: {
    light: {
      primary: '#2233AA',
      surface: '#FAFAFC',
    },
    typography: {
      fontFamily: 'Synthetic Sans',
      headingScale: 1.1,
    },
    controls: {
      height: 48,
      radius: 10,
    },
    borderRadius: 18,
    motion: 'reduced',
    safeAreas: {
      mobile: { top: 24, bottom: 16 },
    },
  },
  responsiveOverrides: {
    mobile: {
      layout: 'fullscreen',
      spacingScale: 0.85,
    },
  },
};

test('design system import accepts only validated JSON token manifests', () => {
  const parsed = parseDesignSystemManifest(
    JSON.stringify(validDesignSystem),
  );
  assert.equal(parsed.ok, true);
  if (parsed.ok) {
    assert.equal(parsed.manifest.name, validDesignSystem.name);
    assert.equal(parsed.manifest.theme.light?.primary, '#2233AA');
  }

  const invalid = parseDesignSystemManifest(JSON.stringify({
    ...validDesignSystem,
    schemaVersion: 99,
    theme: {
      ...validDesignSystem.theme,
      customCss: 'body { display: none }',
      light: { primary: 'javascript:alert(1)' },
      branding: { logoLightUrl: 'http://insecure.example/logo.svg' },
    },
  }));
  assert.equal(invalid.ok, false);
  if (!invalid.ok) {
    assert.equal(
      invalid.issues.some((issue) => issue.code === 'unsupportedVersion'),
      true,
    );
    assert.equal(
      invalid.issues.some(
        (issue) => issue.code === 'unknownProperty'
          && issue.path === 'theme.customCss',
      ),
      true,
    );
    assert.equal(
      invalid.issues.some(
        (issue) => issue.code === 'invalidValue'
          && issue.path === 'theme.light.primary',
      ),
      true,
    );
  }
  assert.equal(parseDesignSystemManifest('{').ok, false);
  const empty = parseDesignSystemManifest(JSON.stringify({
    schemaVersion: 1,
    name: 'No-op',
    version: '1.0.0',
    theme: {},
  }));
  assert.equal(empty.ok, false);
  if (!empty.ok) {
    assert.equal(
      empty.issues.some((issue) => issue.code === 'emptyManifest'),
      true,
    );
  }
});

test('design system application deep-merges tokens and preserves interface content', () => {
  const project = createFlowProjectV2('Import target');
  const applied = applyDesignSystemManifest(
    project.interface,
    validDesignSystem,
    new Date('2026-07-29T08:00:00.000Z'),
  );

  assert.equal(applied.screens, project.interface.screens);
  assert.equal(applied.layout, 'split');
  assert.equal(applied.theme.light.primary, '#2233AA');
  assert.equal(
    applied.theme.light.onPrimary,
    project.interface.theme.light.onPrimary,
  );
  assert.equal(applied.theme.controls.height, 48);
  assert.equal(
    applied.theme.controls.borderWidth,
    project.interface.theme.controls.borderWidth,
  );
  assert.equal(applied.theme.safeAreas.mobile.top, 24);
  assert.equal(applied.theme.safeAreas.mobile.left, 0);
  assert.equal(applied.responsiveOverrides?.mobile?.layout, 'fullscreen');
  assert.deepEqual(applied.designSystem, {
    name: 'Synthetic trust design',
    version: '2.4.0',
    format: 'identra-design-system-v1',
    importedAt: '2026-07-29T08:00:00.000Z',
    sourceHash: applied.designSystem?.sourceHash,
  });

  const appliedAgain = applyDesignSystemManifest(
    project.interface,
    validDesignSystem,
    new Date('2027-01-01T00:00:00.000Z'),
  );
  assert.equal(
    applied.designSystem?.sourceHash,
    appliedAgain.designSystem?.sourceHash,
  );
});

test('visual regression identifies layout, theme, structure, content and missing targets', () => {
  const project = createFlowProjectV2('Visual regression target');
  const screen = project.interface.screens[0];
  const variant = screen?.variants[0];
  assert.ok(screen);
  assert.ok(variant);
  const context: VisualRegressionContext = {
    screenId: screen.id,
    variantId: variant.id,
    breakpoint: 'mobile',
    themeMode: 'light',
    locale: 'en',
  };
  const baseline = createVisualRegressionSnapshot(project.interface, context);
  assert.ok(baseline);
  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(project.interface, context),
    ),
    { status: 'passed', changedChannels: [] },
  );

  const layoutChanged: InterfaceManifestV2 = {
    ...project.interface,
    responsiveOverrides: {
      mobile: { spacingScale: 1.4 },
    },
  };
  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(layoutChanged, context),
    ),
    { status: 'changed', changedChannels: ['layout'] },
  );

  const themeChanged: InterfaceManifestV2 = {
    ...project.interface,
    theme: {
      ...project.interface.theme,
      light: {
        ...project.interface.theme.light,
        primary: '#1122AA',
      },
    },
  };
  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(themeChanged, context),
    ),
    { status: 'changed', changedChannels: ['theme'] },
  );

  const structureChanged: InterfaceManifestV2 = {
    ...project.interface,
    screens: project.interface.screens.map((candidate) =>
      candidate.id === screen.id
        ? {
            ...candidate,
            variants: candidate.variants.map((item) =>
              item.id === variant.id
                ? {
                    ...item,
                    blocks: item.blocks.map((block, index): InterfaceBlock =>
                      index === 0 ? { ...block, hidden: true } : block),
                  }
                : item),
          }
        : candidate),
  };
  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(structureChanged, context),
    ),
    { status: 'changed', changedChannels: ['structure'] },
  );

  const contentChanged: InterfaceManifestV2 = {
    ...project.interface,
    screens: project.interface.screens.map((candidate) =>
      candidate.id === screen.id
        ? {
            ...candidate,
            variants: candidate.variants.map((item) =>
              item.id === variant.id
                ? {
                    ...item,
                    blocks: item.blocks.map((block, index): InterfaceBlock =>
                      index === 0 && block.kind === 'heading'
                        ? {
                            ...block,
                            content: {
                              ...block.content,
                              en: 'Updated visual copy',
                            },
                          }
                        : block),
                  }
                : item),
          }
        : candidate),
  };
  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(contentChanged, context),
    ),
    { status: 'changed', changedChannels: ['content'] },
  );

  assert.deepEqual(
    compareVisualRegressionSnapshot(
      baseline,
      createVisualRegressionSnapshot(project.interface, {
        ...context,
        variantId: 'removed-variant',
      }),
    ),
    { status: 'missing', changedChannels: [] },
  );
});

test('visual baseline upsert replaces only an identical preview context', () => {
  const project = createFlowProjectV2('Baseline target');
  const screen = project.interface.screens[0];
  const variant = screen?.variants[0];
  assert.ok(screen);
  assert.ok(variant);
  const context: VisualRegressionContext = {
    screenId: screen.id,
    variantId: variant.id,
    breakpoint: 'desktop',
    themeMode: 'dark',
    locale: 'en',
  };
  const first = createVisualRegressionBaseline(
    project.interface,
    context,
    { id: 'baseline-one', capturedAt: '2026-07-29T09:00:00.000Z' },
  );
  const replacement = createVisualRegressionBaseline(
    project.interface,
    context,
    { id: 'baseline-two', capturedAt: '2026-07-29T10:00:00.000Z' },
  );
  assert.ok(first);
  assert.ok(replacement);

  const baselines = upsertVisualRegressionBaseline([first], replacement);
  assert.equal(baselines.length, 1);
  assert.equal(baselines[0]?.id, 'baseline-two');
  assert.equal(first.id, 'baseline-one');
});

test('workspace storage accepts design metadata and hash-only visual baselines', () => {
  const project = createFlowProjectV2('Persist quality configuration');
  const screen = project.interface.screens[0];
  const variant = screen?.variants[0];
  assert.ok(screen);
  assert.ok(variant);
  const importedInterface = applyDesignSystemManifest(
    project.interface,
    validDesignSystem,
    new Date('2026-07-29T11:00:00.000Z'),
  );
  const baseline = createVisualRegressionBaseline(
    importedInterface,
    {
      screenId: screen.id,
      variantId: variant.id,
      breakpoint: 'tablet',
      themeMode: 'light',
      locale: 'en',
    },
    {
      id: 'persisted-baseline',
      capturedAt: '2026-07-29T11:01:00.000Z',
    },
  );
  assert.ok(baseline);
  const workspace = {
    ...createEmptyWorkspaceV2(new Date('2026-07-29T11:02:00.000Z')),
    projects: [{
      ...project,
      interface: importedInterface,
      visualRegressionBaselines: [baseline],
    }],
  };

  const prepared = prepareDashboardWorkspaceForStorage(workspace);
  assert.equal(prepared.ok, true);
  if (prepared.ok) {
    const storedProject = prepared.workspace.projects[0];
    assert.equal(
      storedProject?.interface.designSystem?.name,
      validDesignSystem.name,
    );
    assert.equal(
      storedProject?.visualRegressionBaselines?.[0]?.snapshot.signature,
      baseline.snapshot.signature,
    );
    assert.equal(
      JSON.stringify(prepared.workspace).includes('Updated visual copy'),
      false,
    );
  }
});
