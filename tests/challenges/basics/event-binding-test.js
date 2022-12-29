import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const controls = {
  name: '[data-test-input="Name"]',
  submit: '[data-test-action="Submit"]',
  message: '[data-test-message="submitted"]',
};

module('Challenges | basics.event-binding', function (hooks) {
  setupRenderingTest(hooks);

  test('The form ', async function (assert) {
    await render(hbs`
      <Basics::EventBinding />
    `);

    assert.dom(controls.submit).isDisabled();
    await fillIn(controls.name, 'Testy');
    assert.dom(controls.submit).isNotDisabled();
    await click(controls.submit);
    assert
      .dom(controls.message)
      .exists('the submission message is shown indicating the action has fired');
    assert.dom(controls.message).hasText('Form submitted. Welcome Testy!');
  });
});
