/**
 * Write a calculator component, using only the helpers defined below, that
 * takes an input arg, @string, in the format '+ 1 * 6 / 3 ^ 3' and prints
 * a single number which is a result of the calculation, e.g. '8'
 *
 * Notes:
 *   - Calculator component should be template-only
 *   - You can assume that all input will be valid and expected
 *   - You should use only the five helpers defined below
 *
 * HINT: a simple example of the steps you can take to calculate the result
 * @string='+ 2 + 3 + 4'
 * => ['+','2','+','3','+','4']
 * => ['+',2,'+',3,'+',4]
 * => [['+',2],['+',3],['+',4]]
 * => [9]
 */

const OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^': (a, b) => a ** b,
}

/**
 * compute
 *
 * Given a number and an operator/number pair, returns the result of the operation
 * e.g. compute(3, ['*', 4]) => 12
 */
const compute = (a, [operator, b]) => OPERATORS[operator](a,b);

/**
 * reduce
 *
 * Reduce a given array to a single value using the given function and initial value (default 0)
 * e.g. reduce([1,2,3], (a,b) => a+b, -1) => 5
 */
const reduce = (array, func, initialValue = 0) => array.reduce(func, initialValue);

/**
 * parsify
 *
 * Given an array of strings, returns the same array but with integers parsed as integers
 * e.g. parsify(['1', 'b', 'c', '3']) => [1, 'b', 'c', 3]
 */
const parsify = array => array.map(n => parseInt(n) === parseInt(n) ? parseInt(n) : n);

/**
 * split
 *
 * Splits a given string by a given delimiter (space is default)
 * e.g. split('too,many,commas', ',') => ['too', 'many', 'commas']
 */
const split = (string, delimiter = ' ') => string.split(delimiter);

/**
 * chunk
 *
 * Splits a given array into an array of array "chunks" of the given size (default 2)
 * e.g. chunk([1, 2, 3, 4, 5, 6], 3) => [[1, 2, 3], [4, 5, 6]]
 */
const chunk = (array, chunkSize = 2) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks
};

/**
 * BEGIN: Only edit below this comment
 */
const Calculator = <template>
  YOUR HELPERS HERE
</template>
/**
 * END: Do not edit below this comment
 */

export default <template>
  <div id="row1">
    {{#let "+ 2 + 3 + 4" as |string|}}
      Input: "{{string}}"
      Output: <Calculator @string={{string}} /> {{! => 9 }}
    {{/let}}
  </div>
  <div id="row2">
    {{#let "+ 4 ^ 2 * 2 + 2 - 1 / 3" as |string|}}
      Input: "{{string}}"
      Output: <Calculator @string={{string}} /> {{! => 11 }}
    {{/let}}
  </div>
</template>
