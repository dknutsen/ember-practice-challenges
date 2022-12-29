import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';

import { or } from 'ember-practice-challenges/helpers/common';

export default <template>
  <button
    data-test-action-button={{@label}}
    class="pl-1 opacity-25 hover:opacity-100"
    type={{or @type "button"}}
    {{on "click" (optional @onClick)}}
  >
    <span class="sr-only">{{@label}}</span>
    {{#let (component @icon) as |Icon|}}
      <Icon />
    {{/let}}
  </button>
</template>
