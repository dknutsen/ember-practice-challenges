import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';

import { classes } from '../../helpers/common';

// TODO: replace this with uniqueId helper when import path is available
const uniqueId = self => guidFor(self);

export default class SwitchComponent extends Component {
  <template>
    {{#let (uniqueId this) as |inputId|}}
      <div class="flex items-center" ...attributes>
        <span class="mr-3" id="switch-label-{{inputId}}">
          <span class="text-sm font-medium text-gray-900">{{@label}}</span>
        </span>
        <button
          type="button"
          class={{classes
            (if @value "bg-indigo-600" "bg-gray-200")
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }}
          role="switch"
          aria-checked="false"
          aria-labelledby="switch-label-{{inputId}}"
          {{on "click" @onClick}}
        >
          <span
            aria-hidden="true"
            class={{classes
              (if @value "translate-x-5" "translate-x-0")
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            }}
          ></span>
        </button>
      </div>
    {{/let}}
  </template>
}
