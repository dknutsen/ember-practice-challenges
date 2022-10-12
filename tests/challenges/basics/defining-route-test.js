import { module, test } from 'qunit';
import { visit, currentURL, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Challenges | basics.defining-route', function(hooks) {
  setupApplicationTest(hooks);

  test('the secret clubhouse can be visited', async function(assert) {
    await visit('/top-secret/classified/james%20bond?id=fake-challenge');
    assert.equal(currentRouteName(), 'secret-clubhouse', 'the secret-clubhouse route exists and is the current route');
    assert.dom('div#message').hasText('Hello james bond, welcome to the secret clubhouse!', 'the template has the correct message');
  });
});
