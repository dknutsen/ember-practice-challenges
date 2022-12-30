import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const addButton = '[data-test-action="Add User"]';
const message = '[data-test-label="message"]';

module('Challenges | helpers.complex-invocation', function (hooks) {
  setupRenderingTest(hooks);

  test('the helper correctly prints the number of records already in the store', async function (assert) {
    await render(hbs`<Helpers::ComplexInvocation />`);
    assert.dom('div#row1').hasText('Input: "+ 2 + 3 + 4", Output: 9');
    assert.dom('div#row2').hasText('Input: "+ 4 ^ 2 * 2 + 2 - 1 / 3", Output: 11');
  });
});
