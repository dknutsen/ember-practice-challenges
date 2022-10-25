import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

import {
  hasKey,
  hashSwap,
  characterCount,
} from 'practice-challenges/components/javascript/objects';

module('Challenges | javascript.objects', function (hooks) {
  setupTest(hooks);

  module('hasKey', function () {
    test('empty inputs return false', function (assert) {
      assert.false(hasKey(null, 'abc'), 'null hash input returns false');
      assert.false(hasKey(undefined, 'abc'), 'undefined hash input returns false');
      assert.false(hasKey([], 'abc'), 'empty array hash input returns false');
      assert.false(hasKey(4, 'abc'), 'numeric hash input returns false');
      assert.false(hasKey({ abc: 1 }, null), 'null key input returns false');
      assert.false(hasKey({ abc: 1 }, undefined), 'undefined key input returns false');
      assert.false(hasKey({ 4: 1 }, 4), 'numeric key input returns false');
      assert.false(hasKey({ 4: 1 }, ''), 'numeric key input returns false');
    });

    test('check for keys that do not exist', function (assert) {
      assert.false(hasKey({ banana: 2, grape: 4 }, 'apple'), 'numeric key input returns false');
    });

    test('check for keys that do exist', function (assert) {
      assert.true(hasKey({ apple: 2 }, 'apple'), 'key exists');
      assert.true(hasKey({ apple: null }, 'apple'), 'key exists');
      assert.true(hasKey({ apple: undefined }, 'apple'), 'key exists');
      assert.true(hasKey({ apple: 'string' }, 'apple'), 'key exists');
    });
  });

  module('hashSwap', function () {
    test('empty inputs return empty object', function (assert) {
      assert.deepEqual(characterCount(null), {}, 'null string input returns empty object');
      assert.deepEqual(
        characterCount(undefined),
        {},
        'undefined string input returns empty object'
      );
      assert.deepEqual(characterCount([]), {}, 'empty string input returns empty object');
    });

    test('swaps normal hashes', function (assert) {
      let result = hashSwap({ nissan: 'maxima', ford: 'taurus', vw: 'tiguan' });
      let expected = { maxima: 'nissan', taurus: 'ford', tiguan: 'vw' };
      assert.deepEqual(result, expected, 'a straightforward hash is swapped properly');

      result = hashSwap({ a: 1, b: 2, c: 3 });
      expected = { 1: 'a', 2: 'b', 3: 'c' };
      assert.deepEqual(result, expected, 'a straightforward hash is swapped properly');
    });

    test('swaps weird hashes', function (assert) {
      const date = new Date('1995-12-17T03:24:00');
      let result = hashSwap({ null: null, undefined: undefined, date, float: 1.3, NaN: NaN });
      let expected = { null: 'null', undefined: 'undefined', 1.3: 'float', NaN: 'NaN' };
      expected[date.toString()] = 'date';
      assert.deepEqual(result, expected, 'a straightforward hash is swapped properly');
    });
  });

  module('characterCount', function () {
    test('empty inputs return empty object', function (assert) {
      assert.deepEqual(characterCount(null), {}, 'null string input returns empty object');
      assert.deepEqual(
        characterCount(undefined),
        {},
        'undefined string input returns empty object'
      );
      assert.deepEqual(characterCount([]), {}, 'empty string input returns empty object');
    });

    test('creates a hash with character counts from an alpha string', function (assert) {
      const result = characterCount('Up Up Down Down Left Right Left Right B A Start');
      const expected = {
        a: 2,
        b: 1,
        d: 2,
        e: 2,
        f: 2,
        g: 2,
        h: 2,
        i: 2,
        l: 2,
        n: 2,
        o: 2,
        p: 2,
        r: 3,
        s: 1,
        t: 6,
        u: 2,
        w: 2,
      };
      assert.deepEqual(result, expected, 'a basic string of alpha characters is counted correctly');
      assert.deepEqual(Object.keys(result), Object.keys(expected), 'the keys are sorted correctly');
    });

    test('excludes non-alphanumeric characters when presented with a weirder string', function (assert) {
      const result = characterCount('a !@#$1%^&*()_+-=`~?2/,.<>;:"\' walks into a bar');
      const expected = {
        1: 1,
        2: 1,
        a: 4,
        b: 1,
        i: 1,
        k: 1,
        l: 1,
        n: 1,
        o: 1,
        r: 1,
        s: 1,
        t: 1,
        w: 1,
      };
      assert.deepEqual(result, expected, 'special characters are not included');
      assert.deepEqual(Object.keys(result), Object.keys(expected), 'the keys are sorted correctly');
    });
  });
});
