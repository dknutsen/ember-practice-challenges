import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice-challenges/tests/helpers';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const newItemInput = '[data-test-input="newItemTitle"]';
const newItemAdd = '[data-test-action="newItem"]';
const listItem = (title) => `[data-test-list-item="${title}"]`;
const listItemTitle = (title) =>
  `[data-test-list-item="${title}"] [data-test-item-attribute="title"]`;
const listItemDone = (title) =>
  `[data-test-list-item="${title}"] [data-test-action="done"]`;

module('Challenges | autotracking.deep-tracking', function (hooks) {
  setupRenderingTest(hooks);

  test('editing title and submitting the form creates a new todo', async function (assert) {
    await render(hbs`<Autotracking::DeepTracking />`);

    await fillIn(newItemInput, 'item 1');
    await click(newItemAdd);
    assert.dom(listItem('item 1')).exists('"item 1" exists');
    assert.dom(listItem('item 1')).hasTagName('li', '"item 1" has an <li> tag');
    assert
      .dom(listItemTitle('item 1'))
      .hasText('item 1', '"item 1" has label "item 1"');
    assert
      .dom(listItemDone('item 1'))
      .exists('the list item has a "Done" button');
    assert
      .dom(listItemDone('item 1'))
      .hasText('Done', 'the done button has text "Done"');
    assert.dom(newItemInput).hasValue('', 'the input value has been cleared');
  });

  test('marking a todo as "Done" removes it from the list', async function (assert) {
    await render(hbs`<Autotracking::DeepTracking />`);

    await fillIn(newItemInput, 'item 1');
    await click(newItemAdd);
    await fillIn(newItemInput, 'item 2');
    await click(newItemAdd);
    await fillIn(newItemInput, 'item 3');
    await click(newItemAdd);
    assert.dom(listItem('item 1')).exists('"item 1" exists');
    assert.dom(listItem('item 2')).exists('"item 2" exists');
    assert.dom(listItem('item 3')).exists('"item 3" exists');

    await click(listItemDone('item 2'));
    assert.dom(listItem('item 1')).exists('"item 1" exists');
    assert.dom(listItem('item 2')).doesNotExist('"item 2" does not exist');
    assert.dom(listItem('item 3')).exists('"item 3" exists');
  });
});
