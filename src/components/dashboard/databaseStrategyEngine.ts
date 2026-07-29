/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  DatabaseAggregation,
  DatabaseNormalizedOutcome,
  DatabaseSourceFixture,
  DatabaseStrategy,
  JsonValue,
} from './dashboardV2Types';

export type {
  DatabaseNormalizedOutcome,
  DatabaseSourceFixture,
  DatabaseStrategy,
};

export type DatabaseStrategyValidationCode =
  | 'missingSource'
  | 'duplicateSource'
  | 'invalidExecutionMode'
  | 'invalidAggregation'
  | 'invalidUnavailablePolicy'
  | 'duplicateRequiredSource'
  | 'requiredSourceNotSelected'
  | 'invalidQuorum'
  | 'invalidWeightedThreshold'
  | 'missingSourceWeight'
  | 'invalidSourceWeight'
  | 'duplicateFixture'
  | 'fixtureForUnselectedSource'
  | 'missingFixture'
  | 'invalidFixtureOutcome'
  | 'invalidMatchScore';

export type DatabaseStrategyValidationIssue = {
  readonly code: DatabaseStrategyValidationCode;
  readonly severity: 'error' | 'warning';
  readonly sourceId?: string;
};

export type DatabaseSourceExecution = {
  readonly sourceId: string;
  readonly outcome: DatabaseNormalizedOutcome;
  readonly matchScore?: number;
  readonly metadata?: Readonly<Record<string, JsonValue>>;
  readonly weight: number;
  readonly fixtureMissing: boolean;
};

export type DatabaseStrategyExecutionMetadata = {
  readonly executionMode: DatabaseStrategy['executionMode'];
  readonly aggregation: DatabaseAggregation;
  readonly sourceOrder: readonly string[];
  readonly evaluatedSourceIds: readonly string[];
  readonly skippedSourceIds: readonly string[];
  readonly stoppedEarly: boolean;
  readonly stopOnMatchApplied: boolean;
  readonly stopReason?: 'matchResolved' | 'requiredSourceUnavailable';
  readonly requiredSourceUnavailableIds: readonly string[];
};

export type DatabaseStrategyExecutionResult = {
  readonly outcome: DatabaseNormalizedOutcome;
  readonly valid: boolean;
  readonly sourceResults: readonly DatabaseSourceExecution[];
  readonly matchedSourceIds: readonly string[];
  readonly unavailableSourceIds: readonly string[];
  readonly aggregateScore?: number;
  readonly validationIssues: readonly DatabaseStrategyValidationIssue[];
  readonly metadata: DatabaseStrategyExecutionMetadata;
};

const EXECUTION_MODES = new Set<DatabaseStrategy['executionMode']>([
  'parallel',
  'sequential',
]);
const AGGREGATIONS = new Set<DatabaseAggregation>([
  'anyMatch',
  'allClear',
  'quorum',
  'weighted',
]);
const UNAVAILABLE_POLICIES = new Set<DatabaseStrategy['unavailablePolicy']>([
  'continue',
  'inconclusive',
  'sourceUnavailable',
]);
const OUTCOMES = new Set<DatabaseNormalizedOutcome>([
  'matched',
  'notMatched',
  'inconclusive',
  'sourceUnavailable',
]);

export const createDefaultDatabaseStrategy = (): DatabaseStrategy => ({
  executionMode: 'parallel',
  aggregation: 'anyMatch',
  stopOnMatch: true,
  requiredSourceIds: [],
  unavailablePolicy: 'continue',
});

const duplicateValues = (values: readonly string[]): ReadonlySet<string> => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return duplicates;
};

export const validateDatabaseStrategy = (
  strategy: DatabaseStrategy,
  sourceIds: readonly string[],
  fixtures: readonly DatabaseSourceFixture[] = [],
): readonly DatabaseStrategyValidationIssue[] => {
  const issues: DatabaseStrategyValidationIssue[] = [];
  const selectedSourceIds = new Set(sourceIds);

  if (sourceIds.length === 0) {
    issues.push({ code: 'missingSource', severity: 'error' });
  }
  for (const sourceId of duplicateValues(sourceIds)) {
    issues.push({ code: 'duplicateSource', severity: 'error', sourceId });
  }
  if (!EXECUTION_MODES.has(strategy.executionMode)) {
    issues.push({ code: 'invalidExecutionMode', severity: 'error' });
  }
  if (!AGGREGATIONS.has(strategy.aggregation)) {
    issues.push({ code: 'invalidAggregation', severity: 'error' });
  }
  if (!UNAVAILABLE_POLICIES.has(strategy.unavailablePolicy)) {
    issues.push({ code: 'invalidUnavailablePolicy', severity: 'error' });
  }

  for (const sourceId of duplicateValues(strategy.requiredSourceIds)) {
    issues.push({ code: 'duplicateRequiredSource', severity: 'error', sourceId });
  }
  for (const sourceId of strategy.requiredSourceIds) {
    if (!selectedSourceIds.has(sourceId)) {
      issues.push({ code: 'requiredSourceNotSelected', severity: 'error', sourceId });
    }
  }

  if (
    strategy.aggregation === 'quorum'
    && (
      !Number.isInteger(strategy.quorum)
      || (strategy.quorum ?? 0) < 1
      || (strategy.quorum ?? 0) > sourceIds.length
    )
  ) {
    issues.push({ code: 'invalidQuorum', severity: 'error' });
  }

  if (strategy.aggregation === 'weighted') {
    if (
      typeof strategy.weightedThreshold !== 'number'
      || !Number.isFinite(strategy.weightedThreshold)
      || strategy.weightedThreshold <= 0
      || strategy.weightedThreshold > 1
    ) {
      issues.push({ code: 'invalidWeightedThreshold', severity: 'error' });
    }
    for (const sourceId of sourceIds) {
      const weight = strategy.sourceWeights?.[sourceId];
      if (weight === undefined) {
        issues.push({ code: 'missingSourceWeight', severity: 'error', sourceId });
      } else if (!Number.isFinite(weight) || weight <= 0) {
        issues.push({ code: 'invalidSourceWeight', severity: 'error', sourceId });
      }
    }
  }

  const fixtureSourceIds = fixtures.map((fixture) => fixture.sourceId);
  for (const sourceId of duplicateValues(fixtureSourceIds)) {
    issues.push({ code: 'duplicateFixture', severity: 'error', sourceId });
  }
  for (const fixture of fixtures) {
    if (!selectedSourceIds.has(fixture.sourceId)) {
      issues.push({
        code: 'fixtureForUnselectedSource',
        severity: 'warning',
        sourceId: fixture.sourceId,
      });
    }
    if (!OUTCOMES.has(fixture.outcome)) {
      issues.push({
        code: 'invalidFixtureOutcome',
        severity: 'error',
        sourceId: fixture.sourceId,
      });
    }
    if (
      fixture.matchScore !== undefined
      && (
        !Number.isFinite(fixture.matchScore)
        || fixture.matchScore < 0
        || fixture.matchScore > 1
      )
    ) {
      issues.push({
        code: 'invalidMatchScore',
        severity: 'error',
        sourceId: fixture.sourceId,
      });
    }
  }

  const fixtureIds = new Set(fixtureSourceIds);
  for (const sourceId of sourceIds) {
    if (!fixtureIds.has(sourceId)) {
      issues.push({ code: 'missingFixture', severity: 'warning', sourceId });
    }
  }

  return issues;
};

const effectiveFixtureMap = (
  fixtures: readonly DatabaseSourceFixture[],
): ReadonlyMap<string, DatabaseSourceFixture> => {
  const fixtureMap = new Map<string, DatabaseSourceFixture>();
  for (const fixture of fixtures) {
    if (!fixtureMap.has(fixture.sourceId)) {
      fixtureMap.set(fixture.sourceId, fixture);
    }
  }
  return fixtureMap;
};

const sourceExecution = (
  strategy: DatabaseStrategy,
  sourceId: string,
  fixtureMap: ReadonlyMap<string, DatabaseSourceFixture>,
): DatabaseSourceExecution => {
  const fixture = fixtureMap.get(sourceId);
  return {
    sourceId,
    outcome: fixture?.outcome ?? 'sourceUnavailable',
    matchScore: fixture?.matchScore,
    metadata: fixture?.metadata,
    weight: strategy.sourceWeights?.[sourceId] ?? 1,
    fixtureMissing: fixture === undefined,
  };
};

const uncertainOutcome = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
): DatabaseNormalizedOutcome | undefined => {
  const hasUnavailable = results.some((result) => result.outcome === 'sourceUnavailable');
  const hasInconclusive = results.some((result) => result.outcome === 'inconclusive');

  if (hasUnavailable && strategy.unavailablePolicy === 'sourceUnavailable') {
    return 'sourceUnavailable';
  }
  if (hasUnavailable && strategy.unavailablePolicy === 'inconclusive') {
    return 'inconclusive';
  }
  if (hasInconclusive) return 'inconclusive';
  if (
    hasUnavailable
    && strategy.unavailablePolicy === 'continue'
    && results.every((result) => result.outcome === 'sourceUnavailable')
  ) {
    return 'sourceUnavailable';
  }
  return undefined;
};

const aggregateSimple = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
): DatabaseNormalizedOutcome => {
  if (
    strategy.unavailablePolicy === 'sourceUnavailable'
    && results.some((result) => result.outcome === 'sourceUnavailable')
  ) {
    return 'sourceUnavailable';
  }
  if (results.some((result) => result.outcome === 'matched')) return 'matched';
  const uncertain = uncertainOutcome(strategy, results);
  return uncertain ?? 'notMatched';
};

const aggregateQuorum = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
): DatabaseNormalizedOutcome => {
  const quorum = strategy.quorum ?? 1;
  const matchCount = results.filter((result) => result.outcome === 'matched').length;

  const unavailable = results.filter(
    (result) => result.outcome === 'sourceUnavailable',
  ).length;
  if (unavailable > 0 && strategy.unavailablePolicy === 'sourceUnavailable') {
    return 'sourceUnavailable';
  }
  if (matchCount >= quorum) return 'matched';
  if (unavailable > 0 && strategy.unavailablePolicy === 'inconclusive') {
    return 'inconclusive';
  }

  const inconclusive = results.filter(
    (result) => result.outcome === 'inconclusive',
  ).length;
  if (matchCount + inconclusive >= quorum) return 'inconclusive';
  if (
    matchCount === 0
    && inconclusive === 0
    && unavailable === results.length
  ) {
    return 'sourceUnavailable';
  }
  return 'notMatched';
};

const scoreForResult = (result: DatabaseSourceExecution): number => {
  if (result.outcome !== 'matched') return 0;
  return result.matchScore ?? 1;
};

const aggregateWeighted = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
  denominatorResults: readonly DatabaseSourceExecution[],
): {
  readonly outcome: DatabaseNormalizedOutcome;
  readonly score: number;
} => {
  const threshold = strategy.weightedThreshold ?? 1;
  const usableDenominatorResults = strategy.unavailablePolicy === 'continue'
    ? denominatorResults.filter((result) => result.outcome !== 'sourceUnavailable')
    : denominatorResults;
  const usableEvaluatedResults = strategy.unavailablePolicy === 'continue'
    ? results.filter((result) => result.outcome !== 'sourceUnavailable')
    : results;
  const totalWeight = usableDenominatorResults.reduce(
    (sum, result) => sum + result.weight,
    0,
  );
  const matchedWeight = usableEvaluatedResults.reduce(
    (sum, result) => sum + scoreForResult(result) * result.weight,
    0,
  );
  const score = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  const unavailable = results.some((result) => result.outcome === 'sourceUnavailable');
  if (unavailable && strategy.unavailablePolicy === 'sourceUnavailable') {
    return { outcome: 'sourceUnavailable', score };
  }
  if (score >= threshold) return { outcome: 'matched', score };
  if (unavailable && strategy.unavailablePolicy === 'inconclusive') {
    return { outcome: 'inconclusive', score };
  }

  const unknownWeight = usableEvaluatedResults.reduce(
    (sum, result) => result.outcome === 'inconclusive' ? sum + result.weight : sum,
    0,
  );
  const maximumScore = totalWeight > 0
    ? (matchedWeight + unknownWeight) / totalWeight
    : 0;
  if (maximumScore >= threshold) return { outcome: 'inconclusive', score };
  if (totalWeight === 0) return { outcome: 'sourceUnavailable', score };
  return { outcome: 'notMatched', score };
};

const aggregateResults = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
  allResults: readonly DatabaseSourceExecution[],
): {
  readonly outcome: DatabaseNormalizedOutcome;
  readonly score?: number;
} => {
  if (strategy.aggregation === 'quorum') {
    return { outcome: aggregateQuorum(strategy, results) };
  }
  if (strategy.aggregation === 'weighted') {
    return aggregateWeighted(strategy, results, allResults);
  }
  return { outcome: aggregateSimple(strategy, results) };
};

const hasResolvedMatch = (
  strategy: DatabaseStrategy,
  results: readonly DatabaseSourceExecution[],
  allResults: readonly DatabaseSourceExecution[],
): boolean => {
  if (strategy.unavailablePolicy === 'sourceUnavailable') return false;
  const evaluatedSourceIds = new Set(
    results.map((result) => result.sourceId),
  );
  if (strategy.requiredSourceIds.some(
    (sourceId) => !evaluatedSourceIds.has(sourceId),
  )) {
    return false;
  }
  if (
    strategy.aggregation === 'anyMatch'
    || strategy.aggregation === 'allClear'
  ) {
    return results.some((result) => result.outcome === 'matched');
  }
  if (strategy.aggregation === 'quorum') {
    return results.filter((result) => result.outcome === 'matched').length
      >= (strategy.quorum ?? 1);
  }

  const eligibleResults = strategy.unavailablePolicy === 'continue'
    ? allResults.filter((result) => result.outcome !== 'sourceUnavailable')
    : allResults;
  const totalWeight = eligibleResults.reduce((sum, result) => sum + result.weight, 0);
  if (totalWeight === 0) return false;
  const matchedWeight = results.reduce(
    (sum, result) => sum + scoreForResult(result) * result.weight,
    0,
  );
  return matchedWeight / totalWeight >= (
    strategy.weightedThreshold ?? 1
  );
};

const emptyMetadata = (
  strategy: DatabaseStrategy,
  sourceIds: readonly string[],
): DatabaseStrategyExecutionMetadata => ({
  executionMode: strategy.executionMode,
  aggregation: strategy.aggregation,
  sourceOrder: [...sourceIds],
  evaluatedSourceIds: [],
  skippedSourceIds: [...sourceIds],
  stoppedEarly: false,
  stopOnMatchApplied: false,
  requiredSourceUnavailableIds: [],
});

export const executeDatabaseStrategy = (
  strategy: DatabaseStrategy,
  sourceIds: readonly string[],
  fixtures: readonly DatabaseSourceFixture[],
): DatabaseStrategyExecutionResult => {
  const validationIssues = validateDatabaseStrategy(strategy, sourceIds, fixtures);
  const hasErrors = validationIssues.some((issue) => issue.severity === 'error');
  if (hasErrors) {
    return {
      outcome: 'inconclusive',
      valid: false,
      sourceResults: [],
      matchedSourceIds: [],
      unavailableSourceIds: [],
      validationIssues,
      metadata: emptyMetadata(strategy, sourceIds),
    };
  }

  const fixtureMap = effectiveFixtureMap(fixtures);
  const allResults = sourceIds.map(
    (sourceId) => sourceExecution(strategy, sourceId, fixtureMap),
  );
  const requiredSourceIds = new Set(strategy.requiredSourceIds);
  const requiredUnavailable = allResults.filter(
    (result) => (
      requiredSourceIds.has(result.sourceId)
      && result.outcome === 'sourceUnavailable'
    ),
  );

  if (
    strategy.executionMode === 'parallel'
    && requiredUnavailable.length > 0
  ) {
    return {
      outcome: 'sourceUnavailable',
      valid: true,
      sourceResults: allResults,
      matchedSourceIds: allResults
        .filter((result) => result.outcome === 'matched')
        .map((result) => result.sourceId),
      unavailableSourceIds: allResults
        .filter((result) => result.outcome === 'sourceUnavailable')
        .map((result) => result.sourceId),
      validationIssues,
      metadata: {
        executionMode: strategy.executionMode,
        aggregation: strategy.aggregation,
        sourceOrder: [...sourceIds],
        evaluatedSourceIds: [...sourceIds],
        skippedSourceIds: [],
        stoppedEarly: false,
        stopOnMatchApplied: false,
        stopReason: 'requiredSourceUnavailable',
        requiredSourceUnavailableIds: requiredUnavailable.map(
          (result) => result.sourceId,
        ),
      },
    };
  }

  let evaluatedResults = allResults;
  let stoppedEarly = false;
  let requiredUnavailableEncountered:
    | DatabaseSourceExecution
    | undefined;
  if (strategy.executionMode === 'sequential') {
    evaluatedResults = [];
    for (const result of allResults) {
      evaluatedResults = [...evaluatedResults, result];
      if (
        requiredSourceIds.has(result.sourceId)
        && result.outcome === 'sourceUnavailable'
      ) {
        requiredUnavailableEncountered = result;
        stoppedEarly = evaluatedResults.length < allResults.length;
        break;
      }
      if (
        strategy.stopOnMatch
        && hasResolvedMatch(strategy, evaluatedResults, allResults)
      ) {
        stoppedEarly = evaluatedResults.length < allResults.length;
        break;
      }
    }
  }

  if (requiredUnavailableEncountered) {
    const evaluatedSourceIds = evaluatedResults.map((result) => result.sourceId);
    return {
      outcome: 'sourceUnavailable',
      valid: true,
      sourceResults: evaluatedResults,
      matchedSourceIds: evaluatedResults
        .filter((result) => result.outcome === 'matched')
        .map((result) => result.sourceId),
      unavailableSourceIds: evaluatedResults
        .filter((result) => result.outcome === 'sourceUnavailable')
        .map((result) => result.sourceId),
      validationIssues,
      metadata: {
        executionMode: strategy.executionMode,
        aggregation: strategy.aggregation,
        sourceOrder: [...sourceIds],
        evaluatedSourceIds,
        skippedSourceIds: sourceIds.slice(evaluatedResults.length),
        stoppedEarly,
        stopOnMatchApplied: false,
        stopReason: 'requiredSourceUnavailable',
        requiredSourceUnavailableIds: [
          requiredUnavailableEncountered.sourceId,
        ],
      },
    };
  }

  const aggregated = aggregateResults(strategy, evaluatedResults, allResults);
  const evaluatedSourceIds = evaluatedResults.map((result) => result.sourceId);
  const skippedSourceIds = sourceIds.slice(evaluatedResults.length);

  return {
    outcome: aggregated.outcome,
    valid: true,
    sourceResults: evaluatedResults,
    matchedSourceIds: evaluatedResults
      .filter((result) => result.outcome === 'matched')
      .map((result) => result.sourceId),
    unavailableSourceIds: evaluatedResults
      .filter((result) => result.outcome === 'sourceUnavailable')
      .map((result) => result.sourceId),
    aggregateScore: aggregated.score,
    validationIssues,
    metadata: {
      executionMode: strategy.executionMode,
      aggregation: strategy.aggregation,
      sourceOrder: [...sourceIds],
      evaluatedSourceIds,
      skippedSourceIds,
      stoppedEarly,
      stopOnMatchApplied: (
        strategy.executionMode === 'sequential'
        && strategy.stopOnMatch
      ),
      stopReason: stoppedEarly ? 'matchResolved' : undefined,
      requiredSourceUnavailableIds: [],
    },
  };
};
