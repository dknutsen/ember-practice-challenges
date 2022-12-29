import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const controls = {
  gravity: '[data-test-switch="Gravity"]',
  gravityFactor: '[data-test-input="Gravity Factor"]',
  restitution: '[data-test-input="Restitution"]',
};

module('Challenges | basics.defining-service', function (hooks) {
  setupRenderingTest(hooks);

  test('the WorldBar component can modify the world.gravity attribute', async function (assert) {
    await render(hbs`<Basics::DefiningService />`);
    const world = this.owner.lookup('service:world');

    assert.false(world.gravity);
    await click(controls.gravity);
    assert.true(world.gravity);
  });

  test('the WorldBar component can modify the world.gravityFactor attribute', async function (assert) {
    await render(hbs`<Basics::DefiningService />`);
    const world = this.owner.lookup('service:world');

    assert.strictEqual(world.gravityFactor, 9.8);
    await fillIn(controls.gravityFactor, '-9.8');
    assert.strictEqual(world.gravityFactor, -9.8);
  });

  test('the WorldBar component can modify the world.restitution attribute', async function (assert) {
    await render(hbs`<Basics::DefiningService />`);
    const world = this.owner.lookup('service:world');

    assert.strictEqual(world.restitution, 1.0);
    await fillIn(controls.restitution, '0.5');
    assert.strictEqual(world.restitution, 0.5);
  });
});
