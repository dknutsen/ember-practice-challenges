import { concat, get, hasBlock } from '@ember/helper';
import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';
import eq from 'ember-truth-helpers/helpers/eq';

import { classes, themed, or } from '../../helpers/common';

const THEMES = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};
const STYLES = {
  outline: 'btn-oueline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  link: 'btn-link',
}
const SIZES = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

export default <template>
  <button
    data-test-action={{@label}}
    class={{classes
      "btn"
      (get THEMES @theme)
      (get SIZES @size)
      (get STYLES @style)
      (if @disabled "btn-disabled")
      (if @wide "btn-wide")
      (if @full "btn-block")
      (if @square "btn-square")
      (if @circle "btn-circle")
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
