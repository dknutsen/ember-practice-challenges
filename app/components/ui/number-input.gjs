import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import pick from 'ember-composable-helpers/helpers/pick';

import UIInput from './input';

// this behaves better than isNaN
const isValidNumber = number => typeof number === 'number' && number === number;

// rounds a number with decimals to the specified number of decimals "most correctly"
const rounded = (number, decimals) => {
  return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
};

export default class NumberInput extends Component {
  get step() {
    const step = Number(this.args.step);
    return isValidNumber(step) ? step : undefined;
  }

  get min() {
    const min = Number(this.args.min);
    return isValidNumber(min) ? min : undefined;
  }

  get max() {
    const max = Number(this.args.max);
    return isValidNumber(max) ? max : undefined;
  }

  get value() {
    const value = Number(this.args.value);
    return isValidNumber(value) ? value : 0;
  }

  get decimals() {
    let decimals = Number(this.args.decimals);
    decimals = isValidNumber(decimals) ? decimals : undefined;
    const valueDec = this.value.toString().split('.')[1]?.length;
    const stepDec = this.step?.toString().split('.')[1]?.length;
    const fallbacks = [valueDec, stepDec, 0].filter(n => !!n || n === 0);
    return decimals || Math.max(...fallbacks);
  }

  @action
  onChange(value) {
    if (!this.args.onChange) return;

    // allow "clearing" of input
    if (isEmpty(value)) {
      this.args.onChange(null);
      return;
    }

    // basic NaN validation
    const newNumber = Number(value);
    if (!isValidNumber(newNumber)) return;

    // if the new value is valid, fire the onChange action we received
    this.args.onChange(newNumber);
  }

  <template>
    <UIInput
      @type="number"
      @disabled={{@disabled}}
      @placeholder={{@placeholder}}
      @min={{this.min}}
      @max={{this.max}}
      @step={{this.step}}
      @value={{this.value}}
      @onChange={{pick "target.value" this.onChange}}
      @onFocus={{@onFocus}}
      @onBlur={{@onBlur}}
    />
  </template>
}
