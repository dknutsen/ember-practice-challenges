import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import { faker } from '@faker-js/faker';
import optional from 'ember-composable-helpers/helpers/optional';

import Button from '../ui/button';

/**
 * Challenge: autotracking.arbitrary-tracking
 *
 * Build out the empty Node class so that it provides auto-tracked data to build
 * an interactive/editable checkbox list
 */

class Node {
  @tracked name = '';
  @tracked children = [];

  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }
}

// NOTE: do not edit below this point
const PlusButton = <template>
  <button
    class="ml-2"
    type="button"
    {{on "click" (optional @onClick)}}
  >
    <span class="sr-only">Add new item</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>
</template>

class Checkbox extends Component {
  uniqueId = guidFor(this);

  @action
  onClick(e) {
    e.preventDefault();
    if (this.args.onClick) this.args.onClick();
  }

  <template>
    <div class="relative flex items-start">
      <div class="flex h-5 items-center">
        <input
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          id={{this.uniqueId}}
          name="comments"
          type="checkbox"
          {{on "click" this.onClick}}
        />
      </div>
      <div class="ml-3 text-sm">
        <label for={{this.uniqueId}} class="font-medium text-gray-700">{{@label}}</label>
      </div>
      {{yield to="right"}}
    </div>
  </template>
}

const CheckboxItem = <template>
  <Checkbox @label={{@node.name}} @onClick={{fn @onClick @node}}>
    <:right>
      <PlusButton />
    </:right>
  </Checkbox>
  <div class="ml-4">
    {{#each @node.children as |item|}}
      <CheckboxItem @node={{item}} @onClick={{fn @onClick item}} />
    {{/each}}
  </div>
</template>

export default class ArbitraryTracking extends Component {
  @tracked rootItems = [
    new Node('apple', [
      new Node('fuji'),
      new Node('honeycrisp'),
    ]),
    new Node('banana'),
    new Node('orange'),
  ];
  @tracked stuff = new Node('apple', [
    new Node('fuji'),
    new Node('honeycrisp'),
  ]);

  @action
  itemClicked(item) {
    console.log(item.name);
  }

  <template>
    {{#each this.rootItems as |item|}}
      <CheckboxItem @node={{item}} @onClick={{fn this.itemClicked item}} />
    {{/each}}
    <CheckboxItem @node={{this.stuff}} @onClick={{fn this.itemClicked this.stuff}} />
  </template>
}
