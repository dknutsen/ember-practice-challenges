import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

export default class Checkbox extends Component {
  uniqueId = guidFor(this);

  get isUnchecked() {
    return this.args.value === 'unchecked';
  }

  get isChecked() {
    return this.args.value === 'checked';
  }

  get isIndeterminate() {
    return this.args.value === 'partial';
  }

  @action
  onCheck(e) {
    e.preventDefault();
    if (this.args.onClick) this.args.onClick();
  }

  <template>
    <div data-test-checkbox={{@label}} class="relative flex items-center">
      <div class="h-5">
        <input
          data-test-checkbox-input={{@label}}
          class="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
          id={{this.uniqueId}}
          name="comments"
          type="checkbox"
          checked={{this.isChecked}}
          indeterminate={{this.isIndeterminate}}
          {{on "change" this.onCheck}}
        />
      </div>
      <div class="ml-2 flex items-center">
        <label for={{this.uniqueId}} class="text-gray-700">{{@label}}</label>
        {{yield to="right"}}
      </div>
    </div>
  </template>
}
