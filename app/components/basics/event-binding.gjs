import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import pick from 'ember-composable-helpers/helpers/pick';

import { set } from 'practice-challenges/helpers/common';
import UIInput from 'practice-challenges/components/ui/input';
import UIButton from 'practice-challenges/components/ui/button';

const not = value => !value || value === '';

export default class WorldBar extends Component {
  @tracked name = '';
  @tracked submitted = false;

  @action
  onSubmit(e) {
    e.preventDefault();
    this.submitted = true;
  }

  <template>
    <form onsubmit="return false;">
      <UIInput
        class="mb-2"
        @label="Name"
        @value={{this.name}}
        @onChange={{pick "target.value" (set this "name")}}
      />
      <UIButton
        @type="submit"
        @label="Submit"
        @disabled={{not this.name}}
      />
    </form>
    {{#if this.submitted}}
      <div data-test-message="submitted">Form submitted. Welcome {{this.name}}!</div>
    {{/if}}
  </template>
}
