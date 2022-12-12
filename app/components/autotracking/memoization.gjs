import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { faker } from '@faker-js/faker';

import Button from '../ui/button';

/**
 * Challenge: autotracking.memoization
 *
 * Modify this code so that the numberOfRows computed property is only recomputed
 * once every time the number of rows changes
 */

export default class BasicTracking extends Component {
  @tracked rows = [];

  // this variable tracks how many times the numberOfRows computed property is called
  count = 0;

  get numberOfRows() {
    this.count++;
    return this.rows.length;
  }

  get counterString() {
    return `rows:${this.numberOfRows} computation count:${this.count}`;
  }

  @action
  addNewRow() {
    this.rows = [...this.rows, faker.word.noun()];
  }

  @action
  rowOfTotalString(index) {
    return `word ${index + 1} of ${this.numberOfRows}`;
  }

  <template>
    <h3 class="text-lg">Random Words</h3>
    <div class="flex items-center mb-4">
      <div data-test-label="counterString" class="mr-4">
        {{this.counterString}}
      </div>
      <Button
        @label="Add Row"
        @onClick={{this.addNewRow}}
      />
    </div>
    <table>
      <tbody>
        {{#each this.rows as |word index|}}
          <tr>
            <td class="w-36">{{word}}</td>
            <td>{{(this.rowOfTotalString index)}}</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </template>
}
