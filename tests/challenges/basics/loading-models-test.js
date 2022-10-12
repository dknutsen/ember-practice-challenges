import { module, test } from 'qunit';
import { visit, currentURL, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Challenges | basics.loading-models', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('the route loads and renders the models', async function(assert) {
    const users = server.createList('user', 8);
    await visit('/basics/loading-models?id="fake"');
    assert.equal(currentRouteName(), 'basics.loading-models', 'the route can be visited');
    assert.dom('[data-test-row]').exists({ count: 5 });
    users.slice(0, 5).forEach((user, index) => {
      assert.dom(`[data-test-row="${index}"] [data-test-column="firstName"]`).hasText(user.firstName);
      assert.dom(`[data-test-row="${index}"] [data-test-column="lastName"]`).hasText(user.lastName);
      assert.dom(`[data-test-row="${index}"] [data-test-column="email"]`).hasText(user.email);
    });
  });
});
