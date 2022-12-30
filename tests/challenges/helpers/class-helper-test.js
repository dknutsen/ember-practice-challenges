import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const addButton = '[data-test-action="Add User"]';
const message = '[data-test-label="message"]';

module('Challenges | helpers.class-helper', function (hooks) {
  setupRenderingTest(hooks);

  test('the helper correctly prints the number of records already in the store', async function (assert) {
    const store = this.owner.lookup('service:store');
    new Array(5).fill(1).forEach(() => store.createRecord('user'));
    await render(hbs`<Helpers::ClassHelper />`);
    assert.dom(message).hasText('The number of users in the store is: 5');
  });

  test('the helper correctly updates the number of records in the store when the user creates them with the button', async function (assert) {
    await render(hbs`<Helpers::ClassHelper />`);
    assert.dom(message).hasText('The number of users in the store is: 0');
    await click(addButton);
    assert.dom(message).hasText('The number of users in the store is: 1');
    await click(addButton);
    await click(addButton);
    await click(addButton);
    assert.dom(message).hasText('The number of users in the store is: 4');
  });
});
