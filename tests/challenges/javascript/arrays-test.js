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
    });

    test('', function (assert) {
      assert.deepEqual(lastN([1,2,3,4,5], 2), [4,5], 'input array length 5, n=2 returns last two elements');
      assert.deepEqual(lastN([1,2,3,4,5], 9), [1,2,3,4,5], 'input array length 5, n=9 returns full array');
    });
  });

  module('negatorator', function () {
    test('empty inputs return empty array', function (assert) {
      assert.deepEqual(negatorator(null, 2), [], 'null array input returns empty array');
      assert.deepEqual(negatorator(undefined, 7), [], 'undefined array input returns empty array');
      assert.deepEqual(negatorator([], 3), [], 'empty array input returns empty array');
    });

    test('negatorator function behaves as expected', function (assert) {
      assert.deepEqual(negatorator([1,2,3]), [-1,-2,-3], 'basic positive array is negated');
      assert.deepEqual(negatorator([-1,-2,-3]), [1,2,3], 'basic negative array is negated');
    });
  });

  module('sanitizer', function () {
    test('sanitizer function behaves as expected', function (assert) {
  
    });
  });

  module('annoyingCalculator', function () {
    test('annoyingCalculator function behaves as expected', function (assert) {
  
    });
  });

  module('mergeBySize', function () {
    test('annoyingCalculator function behaves as expected', function (assert) {
  
    });
  });
});
