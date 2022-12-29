import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, fillIn, find, findAll, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const checkboxItem = label =>
  label ? `[data-test-checkbox-item="${label}"]` : '[data-test-checkbox-item]';
const checkboxInput = label => `${checkboxItem(label)} [data-test-checkbox] input`;
const checkboxAction = (label, action) =>
  `${checkboxItem(label)} [data-test-action-button="${action}"]`;
const checkboxNameInput = label => `${checkboxItem(label)} [data-test-checkbox-name-input] input`;

module('Challenges | autotracking.arbitrary-tracking', function (hooks) {
  setupRenderingTest(hooks);

  test('the default set of checkboxes is rendered', async function (assert) {
    await render(hbs`<Autotracking::ArbitraryTracking />`);

    // total checkboxes
    let checkboxes = findAll(checkboxItem());
    assert.strictEqual(checkboxes.length, 15, '15 total checkboxes are rendered');
    // root
    checkboxes = findAll(`${checkboxItem('produce')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 14, 'produce has 14 children');
    // first level children
    checkboxes = findAll(`${checkboxItem('fruit')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 5, 'fruit has 5 children');
    checkboxes = findAll(`${checkboxItem('vegetables')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 7, 'vegetables has 7 children');
    // second level children
    checkboxes = findAll(`${checkboxItem('apple')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 2, 'apple has 2 children');
    checkboxes = findAll(`${checkboxItem('banana')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 0, 'banana has 0 children');
    checkboxes = findAll(`${checkboxItem('orange')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 0, 'orange has 0 children');
    checkboxes = findAll(`${checkboxItem('onion')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 0, 'onion has 0 children');
    checkboxes = findAll(`${checkboxItem('squash')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 3, 'squash has 3 children');
    checkboxes = findAll(`${checkboxItem('carrot')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 0, 'carrot has 0 children');
    checkboxes = findAll(`${checkboxItem('celery')} ${checkboxItem()}`);
    assert.strictEqual(checkboxes.length, 0, 'celery has 0 children');
  });

  test('checking a leaf node checks the checkbox and partially checks all ancestor checkboxes', async function (assert) {
    await render(hbs`<Autotracking::ArbitraryTracking />`);
    await click(checkboxInput('honeycrisp'));
    assert.dom(checkboxInput('honeycrisp')).isChecked('honeycrisp is checked');
    assert.true(find(checkboxInput('apple')).indeterminate, 'apple is partially checked');
    assert.true(find(checkboxInput('fruit')).indeterminate, 'fruit is partially checked');
    assert.true(find(checkboxInput('produce')).indeterminate, 'fruit is partially checked');
  });

  test('checking and unchecking a node checks or unchecks all the child checkboxes', async function (assert) {
    await render(hbs`<Autotracking::ArbitraryTracking />`);
    let checkboxes = findAll(checkboxInput());

    await click(checkboxInput('produce'));
    checkboxes.forEach(checkbox => assert.dom(checkbox).isChecked('the checkbox is checked'));
    await click(checkboxInput('produce'));
    checkboxes.forEach(checkbox => assert.dom(checkbox).isNotChecked('the checkbox is unchecked'));

    checkboxes = findAll(`${checkboxItem('fruit')} ${checkboxItem()} input`);
    await click(checkboxInput('fruit'));
    checkboxes.forEach(checkbox => assert.dom(checkbox).isChecked('the checkbox is checked'));
    await click(checkboxInput('fruit'));
    checkboxes.forEach(checkbox => assert.dom(checkbox).isNotChecked('the checkbox is unchecked'));
  });

  module('actions', function () {
    test('clicking the "add child" button adds a child checkbox with label "New Item"', async function (assert) {
      await render(hbs`<Autotracking::ArbitraryTracking />`);
      await click(checkboxAction('apple', 'Add new child'));
      const checkboxes = findAll(`${checkboxItem('apple')} ${checkboxItem()}`);
      assert.strictEqual(checkboxes.length, 3, 'apple has 3 children');
      assert.dom(checkboxes[2]).includesText('New Item');
    });

    test('clicking the "remove child" button adds a child checkbox with label "New Item"', async function (assert) {
      await render(hbs`<Autotracking::ArbitraryTracking />`);
      await click(checkboxAction('vegetables', 'Delete checkbox and all children'));
      const checkboxes = findAll(checkboxItem());
      assert.strictEqual(checkboxes.length, 7, '7 checkboxes rendered, only fruits remain');
    });

    test('clicking the "Edit checkbox name" button opens an input form for editing the checkbox name', async function (assert) {
      await render(hbs`<Autotracking::ArbitraryTracking />`);
      await click(checkboxAction('apple', 'Edit checkbox name'));
      await fillIn(checkboxNameInput('apple'), 'pomme');
      await click('[data-test-action-button="Done editing name"]');
      assert.dom(checkboxItem('pomme')).includesText('pomme');
      const checkboxes = findAll(`${checkboxItem('pomme')} ${checkboxItem()}`);
      assert.strictEqual(checkboxes.length, 2, 'pomme has 2 children');
    });
  });
});
