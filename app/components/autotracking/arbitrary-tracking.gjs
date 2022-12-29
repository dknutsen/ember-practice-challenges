import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { faker } from '@faker-js/faker';
import optional from 'ember-composable-helpers/helpers/optional';
import pick from 'ember-composable-helpers/helpers/pick';

import { or, set } from 'ember-practice-challenges/helpers/common';
import { PlusIcon, TrashIcon, EditIcon, DoneIcon } from 'ember-practice-challenges/components/ui/icons';
import UIButton from 'ember-practice-challenges/components/ui/button';
import UIInput from 'ember-practice-challenges/components/ui/input';
import Checkbox from 'ember-practice-challenges/components/ui/checkbox';
import ActionButton from 'ember-practice-challenges/components/ui/action-button';

/**
 * Challenge: autotracking.arbitrary-tracking
 *
 * Autotracking is powerful in components but it can also bs used to track state on
 * other arbitrary classes, meaning that your reactive data can be separated from
 * your rendering (component) layer.
 *
 * To see this in action we'll build out a simple very generic Node class which
 * could represent a node in any tree-like graph. We've already defined some UI
 * below which will use this Node class to manage a nested checkbox list complete
 * with add, delete, and name edit capabilities.
 *
 * The UI components are already defined, you just need to BYO Node class!
 * Build out the Node class stubbed below. It should have:
 *   - a reactive string property called "name"
 *   - a reactive object property called "parent"
 *   - a reactive array property called "children"
 *   - a reactive boolean property called "isActive"
 *   - a computed getter called "isRoot" that returns true if the node has no parent
 *   - a computed getter called "isLeaf" that returns true if the node has no children
 *   - a computed getter called "activeState" that returns `nodeActiveState(this)`
 *   - a constructor which initializes name and children to the given args, and initializes each child's `parent` property as `this`
 */

class Node {
  // tracked properties can be added to any class
  // here we just need a few simple tracked properties
  @tracked name = '';
  @tracked parent = null;
  @tracked children = [];
  @tracked isActive = false;

  // just like on a component these getters will auto update when the
  // tracked data dependencies change
  get isRoot() {
    return !!this.parent;
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get activeState() {
    return nodeActiveState(this);
  }

  constructor(name, children = []) {
    this.name = name;
    this.children = children;
    this.children.forEach(c => c.parent = this);
  }

  // in a real-world example we might add some actions here for setting state
  // more easily from a template, etc. but that would bloat this challenge
}

/**
 * NOTE: do not edit below this point
 */
const changeNodeState = (node, newCheckedState) => {
  if (node.isLeaf) {
    node.isActive = newCheckedState === 'checked' ? true : false;
    return;
  }
  node.children?.forEach(c => changeNodeState(c, newCheckedState));
};

const nodeActiveState = ({ isLeaf, isActive, children }) => {
  if (isLeaf) return isActive ? 'checked' : 'unchecked';
  const { checked, unchecked, partial } = children.map(child => child.activeState).reduce((counter, state) => {
    counter[state]++;
    return counter;
  }, { checked: 0, unchecked: 0, partial: 0 });
  if (checked === children.length) return 'checked';
  if (unchecked === children.length) return 'unchecked';
  return 'partial';
};

class CheckboxItem extends Component {
  @tracked isEditing = false;

  @action onClick() {
    const { node } = this.args;
    changeNodeState(node, node.activeState === 'checked' ? 'unchecked' : 'checked');
  }

  @action
  addChild() {
    const child = new Node('New Item');
    child.parent = this.args.node;
    this.args.node.children = [...(this.args.node.children || []), child];
  }

  @action
  removeChild() {
    const parent = this.args.node.parent;
    if (!parent) return;
    parent.children = parent.children.filter(c => c !== this.args.node);
  }

  @action
  editingClicked(event) {
    event?.preventDefault?.();
    this.isEditing = !this.isEditing;
  }

  <template>
    <div class="pt-1" data-test-checkbox-item={{@node.name}}>
      <Checkbox @label={{@node.name}} @onClick={{this.onClick}} @value={{@node.activeState}}>
        <:right>
          <div class="flex items-center ml-1">
            <ActionButton @icon={{component PlusIcon}} @label="Add new child" @onClick={{this.addChild}} />
            <ActionButton @icon={{component EditIcon}} @label="Edit checkbox name" @onClick={{this.editingClicked}} />
            {{#if @node.parent}}
              <ActionButton @icon={{component TrashIcon}} @label="Delete checkbox and all children" @onClick={{this.removeChild}} />
            {{/if}}
          </div>
        </:right>
      </Checkbox>
      {{#if this.isEditing}}
        <form class="ml-4 flex items-center" {{on "submit" this.editingClicked}}>
          Edit:
          <UIInput data-test-checkbox-name-input={{@node.name}} @value={{@node.name}} @onChange={{pick "target.value" (set @node "name")}} />
          <ActionButton data-test-checkbox-name-submit={{@node.name}} @icon={{component DoneIcon}} @label="Done editing name" @type="submit" />
        </form>
      {{/if}}
      <div class="ml-4">
        {{#each @node.children as |child|}}
          <CheckboxItem @node={{child}} />
        {{/each}}
      </div>
    </div>
  </template>
}

export default class ArbitraryTracking extends Component {
  @tracked root = new Node('produce', [
    new Node('fruit', [
      new Node('apple', [
        new Node('fuji'),
        new Node('honeycrisp'),
      ]),
      new Node('banana'),
      new Node('orange'),
    ]),
    new Node('vegetables', [
      new Node('onion'),
      new Node('squash', [
        new Node('zucchini'),
        new Node('acorn'),
        new Node('spaghetti'),
      ]),
      new Node('carrot'),
      new Node('celery'),
    ]),
  ]);

  <template>
    <CheckboxItem @node={{this.root}} />
  </template>
}
