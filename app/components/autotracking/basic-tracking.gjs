import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

const isEmpty = (it) => it === '' || it === undefined || it === null;

export default class BasicTracking extends Component {
  count = 0;

  get message() {
    return `The count is: ${this.count}`;
  }

  @action
  onIncrement() {
    this.count++;
  }

  <template>
    <div data-test-label="message">
      {{this.message}}
    </div>
    {{!-- FIXME: replace with ui button --}}
    <button
      data-test-action="increment"
      class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
      type="button"
      {{on "click" this.onIncrement}}
    >
      Increment +
    </button>
  </template>
}
