import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice-challenges/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Challenges | basics.defining-component', function (hooks) {
  setupRenderingTest(hooks);

  test('the component renders the correct text', async function (assert) {
    await render(hbs`<Basics::DefiningComponent::Tag @label="photography" @color="blue" />`);
    assert.dom('span').hasText('#photography');
  });

  test('the component renders the correct color class', async function (assert) {
    await render(hbs`<Basics::DefiningComponent::Tag @label="photography" @color="blue" />`);
    assert.dom('span').hasClass('bg-blue-600');
  });

  test('the component renders the correct display classes', async function (assert) {
    await render(hbs`<Basics::DefiningComponent::Tag @label="photography" @color="blue" />`);
    assert.dom('span').hasClass('px-2');
    assert.dom('span').hasClass('py-1');
    assert.dom('span').hasClass('m-1');
    assert.dom('span').hasClass('text-white');
    assert.dom('span').hasClass('rounded-md');
  });
});
