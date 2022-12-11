import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice-challenges/tests/helpers';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const addRow = '[data-test-action="Add Row"]';
const counter = '[data-test-label="counterString"]';

module('Challenges | autotracking.memoization', function (hooks) {
  setupRenderingTest(hooks);

  test('The row counter computed property is only computed once per render (once every time the number of rows change)', async function (assert) {
    await render(hbs`
      <Autotracking::Memoization />
    `);
    await click(addRow);
    await click(addRow);
    await click(addRow);
    await click(addRow);
    await click(addRow);
    assert.dom(counter).hasText('rows:5 computation count:6');
  });
});
