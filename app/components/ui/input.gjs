import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import optional from 'ember-composable-helpers/helpers/optional';
import { guidFor } from '@ember/object/internals';

// TODO: replace this with uniqueId helper when import path is available
const uniqueId = self => guidFor(self);

export default class InputComponent extends Component {
  <template>
    {{#let (uniqueId this) as |inputId|}}
      <div class="fieldset" ...attributes>
        <label
          for="input-{{inputId}}"
          class="fieldset-legent"
        >
          {{~@label~}}
        </label>
        <input
          data-test-input={{@label}}
          id="input-{{inputId}}"
          class="input input-sm"
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
      </div>
    {{/let}}
  </template>
}
