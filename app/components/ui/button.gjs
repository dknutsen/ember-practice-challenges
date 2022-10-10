import { hasBlock } from '@ember/helper';
import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';

import { classes, theme, or } from '../../helpers/common';

export default <template>
  <button
    data-test-action={{@label}}
    class={{classes
      "px-2 py-1 rounded text-white"
      (theme (or @theme "primary"))
    }}
    disabled={{@disabled}}
    type={{or @type "button"}}
    {{on "click" (optional @onClick)}}
    ...attributes
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@label}}
    {{/if}}
  </button>
</template>;
