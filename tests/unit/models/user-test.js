import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

const EXPECTED = {
  firstName: 'raw',
  lastName: 'raw',
  email: 'raw',
  createdAt: 'date',
  updatedAt: 'date',
};

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);

  /* eslint-disable qunit/require-expect */
  test('it has the expected attributes', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {});
    model.eachAttribute((_name, meta) => {
      // unpack attribute information
      const { type = 'raw', name } = meta;
      assert.true(
        Object.keys(EXPECTED).includes(name),
        `attribute ${name} found which was expected`
      );
      assert.strictEqual(
        EXPECTED[name],
        type,
        `attribute ${name} had expected type: ${EXPECTED[name]}`
      );
    });
  });
  /* eslint-enable qunit/require-expect */
});
