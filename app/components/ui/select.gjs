import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
import pick from 'ember-composable-helpers/helpers/pick';
import eq from 'ember-truth-helpers/helpers/eq';

const SelectOption = <template>
  <option value={{@value}} selected={{if (eq @currentValue @value) true false}}>{{@label}}</option>
</template>

export default <template>
  <select
    class="py-1 px-2 m-2 rounded leading-tight focus:outline-none border"
    ...attributes
    {{on "change" (pick "target.value" @onChange)}}
  >
    {{yield (hash option=(component SelectOption currentValue=@value))}}
  </select>
</template>
