import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import Button from '../ui/button';

const isEmpty = (it) => it === '' || it === undefined || it === null;

export default class BasicTracking extends Component {
  @tracked count = 0;

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
    <Button
      @label="Increment"
      @theme="primary"
      @onClick={{this.onIncrement}}
    >
      Increment +
    </Button>
  </template>
}
