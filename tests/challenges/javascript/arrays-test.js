import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

import {
  lastN,
  negatorator,
  sanitizer,
  annoyingCalculator,
  mergeBySize
} from 'practice-challenges/components/javascript/arrays';

module('Challenges | javascript.arrays', function (hooks) {
  setupTest(hooks);

  module('lastN', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(lastN(null, 2), [], 'null array input returns empty array');
      assert.deepEqual(lastN(undefined, 7), [], 'undefined array input returns empty array');
      assert.deepEqual(lastN([], 3), [], 'empty array input returns empty array');
      assert.deepEqual(lastN([1,2,3], 0), [], 'n=0 returns empty array');
      assert.deepEqual(lastN([1,2,3], -4), [], 'n<0 returns empty array');
    });

    test('n < array.length returns last n elements', function (assert) {
      assert.deepEqual(lastN([1,2,3,4,5], 2), [4,5], 'input array length 5, n=2 returns last two elements');
    });

    test('n > array.length returns entire array', function (assert) {
      assert.deepEqual(lastN([1,2,3,4,5], 9), [1,2,3,4,5], 'input array length 5, n=9 returns full array');
    });
  });

  module('negatorator', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(negatorator(null), [], 'null array input returns empty array');
      assert.deepEqual(negatorator(undefined), [], 'undefined array input returns empty array');
      assert.deepEqual(negatorator([]), [], 'empty array input returns empty array');
    });

    test('negatorator function negates arrays of numbers', function (assert) {
      assert.deepEqual(negatorator([1,2.2,3]), [-1,-2.2,-3], 'basic positive array is negated');
      assert.deepEqual(negatorator([-1,-2.2,-3]), [1,2.2,3], 'basic negative array is negated');
    });

    test('handles 0s and non-numbers gracefully', function (assert) {
      assert.deepEqual(negatorator([0, 'string', '1.23']), [0, NaN, -1.23], 'basic positive array is negated');
    });
  });

  module('sanitizer', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(sanitizer(null), [], 'null array input returns empty array');
      assert.deepEqual(sanitizer(undefined), [], 'undefined array input returns empty array');
      assert.deepEqual(sanitizer([]), [], 'empty array input returns empty array');
    });

    test('correctly removes yucky values', function (assert) {
      assert.deepEqual(sanitizer([-1, 0, 1, -14, 14]), [0, 1, 14], 'negative numbers are removed');
      assert.deepEqual(sanitizer([[1], [], { a: 1 }, {}, 'bass', '']), [[1], { a: 1 }, 'bass'], 'empty arrays/objects/strings are removed');
      assert.deepEqual(sanitizer([12, 13, 14, '13']), [12, 14, '13'], 'the number 13 is removed');
      assert.deepEqual(sanitizer(['the', 'very', 'moist', 'cake', 'was', 'tasty', 'and', 'MOIST']).join(' '), 'the very cake was tasty and', 'the word "moist" is removed');
      assert.deepEqual(sanitizer(['a', 'c', 'q', 'quark', 'Q', 'quack', 'ABQ']), ['a', 'c', 'quark', 'quack', 'ABQ'], 'the letter "q" is removed');
    });
  });

  module('annoyingCalculator', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(annoyingCalculator(null), [], 'null array input returns empty array');
      assert.deepEqual(annoyingCalculator(undefined), [], 'undefined array input returns empty array');
      assert.deepEqual(annoyingCalculator([]), [], 'empty array input returns empty array');
    });

    test('properly calculates operations', function (assert) {
      assert.deepEqual(annoyingCalculator([['+', 13]]), 13, 'initial operation only works');
      assert.deepEqual(annoyingCalculator([['+', 1], ['+', 3]]), 4, '+ operator works');
      assert.deepEqual(annoyingCalculator([['+', 12], ['-', 3]]), 9, '- operator works');
      assert.deepEqual(annoyingCalculator([['+', 3], ['*', 3]]), 9, '* operator works');
      assert.deepEqual(annoyingCalculator([['+', 12], ['/', 3]]), 4, '/ operator works');
      assert.deepEqual(annoyingCalculator([['+', 2], ['^', 10]]), 1024, '^ operator works');
      assert.deepEqual(annoyingCalculator([['+', 3], ['^', 3], ['/', 9], ['*', 3.33], ['+', 0.01], ['-', 9]]), 1, 'compound operations works');
    });
  });

  module('mergeBySize', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(mergeBySize(null), [], 'null array input returns empty array');
      assert.deepEqual(mergeBySize(undefined), [], 'undefined array input returns empty array');
      assert.deepEqual(mergeBySize([]), [], 'empty array input returns empty array');
    });

    test('properly merges arrays', function (assert) {
      assert.deepEqual(mergeBySize([[1], [2], [3]]), [1, 2, 3], 'arrays of same length'); 
      assert.deepEqual(mergeBySize([[3, 3, 3], [2, 2], [1]]), [3, 3, 3, 2, 2, 1], 'arrays already sorted'); 
      assert.deepEqual(mergeBySize([['k'], ['f', 'g', 'h'], ['i', 'j'], ['l'], ['a', 'b', 'c', 'd', 'e']]).join(''), 'abcdefghijkl', 'array variety'); 
    });

    test('properly merges arrays', function (assert) {
      assert.deepEqual(mergeBySize(['k', 'fgh', 'ij', 'l', 'abcde']), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'], 'works with strings too'); 
    });
  });
});
