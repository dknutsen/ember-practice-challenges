import { module, test } from 'qunit';
import { visit, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Challenges | basics.loading-models', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('the route loads and renders the models', async function (assert) {
    const users = this.server.createList('user', 8);
    await visit('/basics/loading-models?id="fake"');
    assert.strictEqual(currentRouteName(), 'basics.loading-models', 'the route can be visited');
    assert.dom('[data-test-row]').exists({ count: 5 }, 'there are 5 user rows rendered');
    users.slice(0, 5).forEach((user, index) => {
      assert
        .dom(`[data-test-row="${index}"] [data-test-column="firstName"]`)
        .hasText(user.firstName, `row ${index} user firstName is correct`);
      assert
        .dom(`[data-test-row="${index}"] [data-test-column="lastName"]`)
        .hasText(user.lastName, `row ${index} user lastName is correct`);
      assert
        .dom(`[data-test-row="${index}"] [data-test-column="email"]`)
        .hasText(user.email, `row ${index} user email is correct`);
    });
  });
});
