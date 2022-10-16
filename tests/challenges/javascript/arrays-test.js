import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

import { lastN, negatorator } from 'practice-challenges/components/javascript/arrays';

module('Challenges | javascript.arrays', function (hooks) {
  setupTest(hooks);

  test('lastN function behaves as expected', function (assert) {
    assert.deepEqual(lastN(null, 2), [], 'null array input returns empty array');
    assert.deepEqual(lastN([1,2,3,4,5], 2), [4,5], 'input array length 5, n=2 returns last two elements');
    assert.deepEqual(lastN([1,2,3,4,5], 9), [1,2,3,4,5], 'input array length 5, n=9 returns full array');
  });

  test('negatorator function behaves as expected', function (assert) {

  });
});
