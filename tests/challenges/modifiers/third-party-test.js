import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Challenges | modifiers.third-party-lib', function (hooks) {
  setupRenderingTest(hooks);

  test('the modifier renders a chart on the canvas', async function (assert) {
    await render(hbs`<Modifiers::ThirdPartyLib />`);
    const canvas = find('canvas');
    // TODO: there's probably a better way to tell if Chart.js is attached
    // to the canvas successfully and the chart is rendered...
    const style = canvas.getAttribute('style');
    assert.true(style?.includes('display:'), 'canvas element has Chart.js initialized on it');
    assert.true(style?.includes('box-sizing:'), 'canvas element has Chart.js initialized on it');
    assert.true(style?.includes('width:'), 'canvas element has Chart.js initialized on it');
    assert.true(style?.includes('height:'), 'canvas element has Chart.js initialized on it');
  });
});
