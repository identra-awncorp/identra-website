import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PLATFORM_JOURNEY_STAGES,
  PLATFORM_PRODUCT_IDS,
  PLATFORM_PRODUCT_VIEWS,
} from '../src/types/platformProducts.ts';
import { APP_VIEWS } from '../src/types/routes.ts';

test('platform registry exposes nine unique products exactly once', () => {
  assert.equal(PLATFORM_PRODUCT_IDS.length, 9);
  assert.equal(new Set(PLATFORM_PRODUCT_IDS).size, PLATFORM_PRODUCT_IDS.length);

  const stagedProducts = PLATFORM_JOURNEY_STAGES.flatMap((stage) => [
    ...stage.products,
  ]);

  assert.equal(stagedProducts.length, PLATFORM_PRODUCT_IDS.length);
  assert.equal(new Set(stagedProducts).size, PLATFORM_PRODUCT_IDS.length);
  assert.deepEqual(
    [...stagedProducts].sort(),
    [...PLATFORM_PRODUCT_IDS].sort(),
  );
});

test('platform product destinations are valid and include Credential Issuance', () => {
  assert.deepEqual(PLATFORM_PRODUCT_VIEWS, {
    interfaceStudio: 'interface-studio',
    dynamicFlow: 'dynamic-flow',
    credentialIssuance: 'credential-issuance',
    workflows: 'workflows',
    caseManagement: 'case-management',
    copilot: 'copilot',
    passiveSignals: 'passive-signals',
    graph: 'graph',
    marketplace: 'marketplace',
  });

  for (const view of Object.values(PLATFORM_PRODUCT_VIEWS)) {
    assert.ok(APP_VIEWS.includes(view), `${view} must be a valid AppView`);
  }
});
