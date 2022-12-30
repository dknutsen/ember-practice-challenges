import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Challenges | helpers.function-helper', function (hooks) {
  setupRenderingTest(hooks);

  test('the helper correctly prints a string one time with no delimiter', async function (assert) {
    await render(hbs`<Helpers::FunctionHelper />`);
    assert.dom('div#row1').hasText('Input ("alone" 1) Output: \'alone\'');
  });

  test('the helper correctly prints a string multiple times with default delimiter', async function (assert) {
    await render(hbs`<Helpers::FunctionHelper />`);
    assert.dom('div#row2').hasText('Input ("hello" 5) Output: \'hello hello hello hello hello\'');
  });

  test('the helper correctly prints a string multiple times with a custom delimiter', async function (assert) {
    await render(hbs`<Helpers::FunctionHelper />`);
    assert.dom('div#row3').hasText('Input ("9" 5 delimiter=", ") Output: \'9, 9, 9, 9, 9\'');
  });
});
