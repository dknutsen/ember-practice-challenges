import { module, test } from 'qunit';
import { visit, currentRouteName, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Challenges | basics.defining-links', function (hooks) {
  setupApplicationTest(hooks);

  test('the route link is defined correctly', async function (assert) {
    await visit('/?id=basics.defining-links');
    assert
      .dom('#route-link a')
      .hasAttribute(
        'href',
        '/basics/defining-links?foo=bar&id=basics.defining-links',
        'the link href is correct'
      );
    assert.dom('#route-link a').hasText('Route link', 'the link text is correct');
    await click('#route-link a');
    assert.strictEqual(
      currentRouteName(),
      'basics.defining-links',
      'the route is correct after clicking the link'
    );
    assert.dom('#param').hasText('query param foo: bar', 'the query param is correctly defined');
  });

  test('the external link is defined correctly', async function (assert) {
    await visit('/?id=basics.defining-links');
    assert
      .dom('#external-link a')
      .hasAttribute('href', 'https://google.com', 'the link href is correct');
    assert.dom('#external-link a').hasAttribute('target', '_blank', 'the link target is correct');
    assert
      .dom('#external-link a')
      .hasAttribute(
        'rel',
        'noreferrer noopener',
        'the rel attribute has the correct security attributes'
      );
    assert.dom('#external-link a').hasText('Google it', 'the link text is correct');
  });
});
