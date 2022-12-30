/**
 * Replace the below `repeater` definition with a helper that:
 *   - takes two args, a string and a number
 *   - repeats the given string n (the given number) times
 *   - separates the repeated strings with the value of the named arg 'delimiter' if given, otherwise a single space
 */

const repeater = () => 'HELPER HERE';

/**
 * Do not edit below this comment
 */
export default <template>
  <div id="row1">Input ("alone" 1) Output: '{{repeater "alone" 1}}'</div>
  <div id="row2">Input ("hello" 5) Output: '{{repeater "hello" 5}}'</div>
  <div id="row3">Input ("9" 5 delimiter=", ") Output: '{{repeater "9" 5 delimiter=", "}}'</div>
</template>
