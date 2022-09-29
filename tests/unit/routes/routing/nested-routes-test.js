import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

module('Unit | Route | routing/nested-routes', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:routing/nested-routes');
    assert.ok(route);
  });
});
