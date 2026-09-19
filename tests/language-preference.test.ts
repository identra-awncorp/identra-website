import assert from 'node:assert/strict';
import test from 'node:test';
import { getPageLanguage, getPreferredLanguage, savePreferredLanguage } from '../src/utils/languagePreference';

const memoryStorage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
};

test('saved locale is used for the neutral root', () => {
  const storage = memoryStorage();
  savePreferredLanguage('vi', storage);
  assert.equal(getPreferredLanguage(storage), 'vi');
  assert.equal(getPageLanguage('/', storage), 'vi');
  assert.equal(getPageLanguage('/pricing', storage), 'vi');
});

test('explicit URL locale wins over a saved preference', () => {
  const storage = memoryStorage();
  savePreferredLanguage('vi', storage);
  assert.equal(getPageLanguage('/en', storage), 'en');
  assert.equal(getPageLanguage('/de/pricing', storage), 'de');
});

test('invalid or unavailable storage falls back safely', () => {
  assert.equal(getPreferredLanguage({ getItem: () => 'xx' }), 'en');
  assert.equal(getPageLanguage('/ja', { getItem: () => { throw new Error('blocked'); } }), 'ja');
  assert.doesNotThrow(() => savePreferredLanguage('es', { setItem: () => { throw new Error('blocked'); } }));
});
