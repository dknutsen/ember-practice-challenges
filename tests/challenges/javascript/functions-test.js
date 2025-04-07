import { module, test } from 'qunit';
import { setupTest } from 'ember-practice-challenges/tests/helpers';

import {
  TOP_SECRET_CODE,
  classifiedProvider,
} from 'ember-practice-challenges/components/javascript/higher-order-functions';

module('Challenges | javascript.functions', function (hooks) {
  setupTest(hooks);
  module('classifiedProvider', function () {
    test('returns the top secret variable', function (assert) {
      const getTheValue = classifiedProvider();
      assert.strictEqual(
        getTheValue(),
        TOP_SECRET_CODE,
        'the top secret code matches the top secret code'
      );
    });
  });
});
