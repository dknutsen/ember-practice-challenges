import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, fillIn, findAll, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const checkbox = label => (label ? `[data-test-checkbox="${label}"]` : '[data-test-checkbox]');
const checkboxInput = label => `${checkbox(label)} input`;
const checkboxAction = (label, action) => `${checkbox(label)} [data-test-action-button=${action}]`;

module('Challenges | autotracking.arbitrary-tracking', function (hooks) {
  setupRenderingTest(hooks);

  test('the default set of checkboxes is rendered', async function (assert) {
    await render(hbs`<Autotracking::ArbitraryTracking />`);

    let checkboxes = findAll(checkbox());
    assert.strictEqual(checkboxes.length, 15, '15 total checkboxes are rendered');
    checkboxes = findAll(`${checkbox('root')} ${checkbox()}`);
    assert.strictEqual(checkboxes.length, 14, 'root has 14 children');
  });
});
