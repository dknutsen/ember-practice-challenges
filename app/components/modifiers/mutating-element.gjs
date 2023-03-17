import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { faker } from '@faker-js/faker';

import UIButton from 'ember-practice-challenges/components/ui/button';

/**
 * Using ember-modifier, write a modifier below
 * Then attach it to the <li> in the component at the bottom.
 * The modifier should change the font size of the list item:
 *   - if there is only one item the font size should be 48
 *   - for every additional item the font size (of all items) should be 2px smaller
 *   - the minimum font size should be 12px at which point the font stops shrinking
 *
 * Hint: the modifier should know how many items are in the list
 */

// [Begin] Write your modifier here!
import { modifier } from 'ember-modifier';
const squeezer = modifier((element, [itemsCount]) => {
  const siblings = itemsCount - 1;
  const fontSize = 48 - (siblings > 18 ? 36 : siblings * 2);
  element.style.fontSize = `${fontSize}px`;
}, {
  // this is to avoid deprecated eager evaluation, not strictly necessary
  eager: false
});
// [End]

export default class SqueezyList extends Component {
  @tracked items = [];

  @action
  pushItem() {
    this.items = [...this.items, faker.word.noun()];
  }

  @action
  popItem() {
    this.items = this.items.slice(1);
  }

  <template>
    <div class="flex">
      <UIButton @label="Add Item" @onClick={{this.pushItem}} />
      <UIButton class="ml-4" @label="Remove Item" @onClick={{this.popItem}} />
    </div>
    <ul class="h-128">
      {{#each this.items as |item index|}}
        <li
          data-test-item={{index}}
          class="flex items-center transition-[font-size]"
          {{squeezer this.items.length}}
        >
          <span>{{~item~}}</span>
        </li>
      {{/each}}
    </ul>
  </template>
}
