import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice-challenges/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const increment = '[data-test-action="Increment"]';
const message   = '[data-test-label="message"]';

module('Challenges | autotracking.basic-tracking', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking the increment button updates the count', async function (assert) {
    await render(hbs`<Autotracking::BasicTracking />`);

    assert.dom(message).hasText('The count is: 0');
    await click(increment);
    assert.dom(message).hasText('The count is: 1');
  });
});
