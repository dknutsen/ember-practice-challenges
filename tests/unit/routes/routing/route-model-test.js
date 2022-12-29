import { module, test } from 'qunit';
import { setupTest } from 'ember-practice-challenges/tests/helpers';

module('Unit | Route | routing/route-model', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:routing/route-model');
    assert.ok(route);
  });
});
