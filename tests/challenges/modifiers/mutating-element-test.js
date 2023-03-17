import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { click, render, findAll, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Challenges | modifiers.mutating-element', function (hooks) {
  setupRenderingTest(hooks);

  test('by default no items are rendered', async function (assert) {
    await render(hbs`<Modifiers::MutatingElement />`);
    let items = findAll('[data-test-item]');
    assert.strictEqual(items.length, 0, 'no items are rendered yet');
  });

  [48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 12].forEach(
    (size, index) => {
      const length = index + 1;
      const fontSize = `${size}px`;
      test(`list with ${length} items renders items of size ${fontSize}`, async function (assert) {
        await render(hbs`<Modifiers::MutatingElement />`);
        for (let i = 0; i < index + 1; i++) {
          await click('[data-test-action="Add Item"]');
        }
        let items = findAll('[data-test-item]');
        // wait for the tailwind animation to finish
        await waitUntil(() => getComputedStyle(items[0]).fontSize === fontSize, {
          timeout: 1000,
        });
        assert.strictEqual(items.length, length, `${length} items are rendered`);
        assert.strictEqual(
          getComputedStyle(items[0]).fontSize,
          fontSize,
          `the item is rendered with font size ${fontSize}`
        );
      });
    }
  );
});
