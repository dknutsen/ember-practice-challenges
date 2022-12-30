import Component from '@ember/component';
import Helper from '@ember/component/helper';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

import UIButton from 'ember-practice-challenges/components/ui/button';

/**
 * Replace the const below with a class based helper (of the same name) that:
 *   - takes a single string argument, the model name
 *   - injects the store service
 *   - returns the number of records in the store of the given model name
 */

class usersCount extends Helper {
  // inject the store
  @service store;

  // The `compute` method is the major prerequisite of a class-based helper
  // A real world helper would need more graceful edge case handling (e.g.
  // if the given model is wrong format or if that model is undefined)
  compute([modelName]) {
    return this.store.peekAll(modelName).length;
  }
}

/**
 * Do not edit below this comment
 */
export default class ClassHelperComponent extends Component {
  @service store;

  @action
  addUser() {
    this.store.createRecord('user', { firstName: 'some', lastName: 'user' });
  }

  <template>
    <div data-test-label="message">The number of users in the store is: {{usersCount 'user'}}</div>
    <UIButton @label="Add User" @onClick={{this.addUser}} />
  </template>
}
