import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';

export default <template>
  <input
    accept={{@accept}}
    value={{@value}}
    type={{@type}}
    disabled={{@disabled}}
    autocomplete={{@autocomplete}}
    min={{@min}}
    max={{@max}}
    step={{@step}}
    minlength={{@minlength}}
    maxlength={{@maxlength}}
    multiple={{@multiple}}
    placeholder={{@placeholder}}
    {{on "change" (optional @onChange)}}
    {{on "input" (optional @onChange)}}
    {{on "click" (optional @onClick)}}
    {{on "focus" (optional @onFocus)}}
    {{on "blur" (optional @onBlur)}}
    {{on "keyup" (optional @onKeyUp)}}
    {{on "keydown" (optional @onKeyDown)}}
    {{on "keypress" (optional @onKeyPress)}}
    {{on "mouseup" (optional @onMouseUp)}}
    ...attributes
  />
</template>
