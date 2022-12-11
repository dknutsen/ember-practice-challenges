import { hasBlock } from '@ember/helper';
import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';
import eq from 'ember-truth-helpers/helpers/eq';

import { classes, themed, or } from '../../helpers/common';

export default <template>
  {{#let 
    (or @theme "primary")
    (or @style "default")
    as |theme style|
  }}
    <button
      data-test-action={{@label}}
      class={{classes
        (if (eq style "default") "px-2 py-1 rounded")
        (if (eq style "default") (themed theme))
        (if @disabled "cursor-not-allowed")
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
  {{/let}}
</template>;
