import { array, get, hash } from '@ember/helper';

// START - Edit the functions below here
/**
 * Write a function that returns the last n elements of the given array
 * @param {Array} array The source array to get the last n elements from
 * @param {Number} n The number of elements to return from the end of the array
 * @returns {Array} an array of the last n (or array.length if lesser than n) elements
 */
export const lastN = (array, n = 1) => {
  // cover edge cases
  if (!array || n < 1) return [];
  // negative slices work from the end
  return array.slice(-1 * n);
}

/**
 * Write a function that returns the input array but with all elements "negated"
 * e.g. [1,2,-4] => [-1,-2,4]
 * @param {Array} array The source array to create a "negative" for
 * @returns {Array} the "negative" of the input array
 */
export const negatorator = (array = []) => {
  // this is a straightforward `map` application
  return (array || []).map(n => -n);
}

/**
 * Write a function that returns the input array but without any yucky elements.
 * A not-yucky element:
 *   - must be >= 0
 *   - must not be empty (null, undefined, '', [], {})
 *   - must not be: the letter 'q', the number '13' or the word 'moist'
 *
 * @param {Array} array The source array to sanitize
 * @returns {Array} the sanitized array
 */
export const sanitizer = (array = []) => {
  // this is a mostly straightforward 'filter' application
  return (array || []).filter(n => {
    // check null/undefined
    if (n === null || n === undefined) return false;
    // check numbers < 0
    if (typeof n === 'number' && n < 0) return false;
    // check empty objects
    if (Object.keys(n).length === 0 && Object.getPrototypeOf(n) === Object.prototype) return false;
    // check empty arrays and strings
    if (n.length === 0) return false;
    // check extra values
    return !['q', 13, 'moist'].includes(n.toLowerCase ? n.toLowerCase() : n)
  });
}

/**
 * Write a function that calculates a numeric value given an array of
 * "operations" which are each arrays with two values:
 *   - an operator, one of: '+', '-', '*', '/', '^'
 *   - an operand, that is, a number
 * The first "operation" operator is always '+'.
 *
 * Example: [['+', 2], ['*', 2], ['-', 1]] => 3
 *
 * @param {Array} array The array of "operations" to compute
 * @returns {Array} the calculated result of the "operations"
 */
// this could also be done as a switch in the reduce or many other ways
const operators = {
  '+': (a,b) => a + b,
  '-': (a,b) => a - b,
  '*': (a,b) => a * b,
  '/': (a,b) => a / b,
  '^': (a,b) => Math.pow(a,b),
};
export const annoyingCalculator = (operations = []) => {
  // handle edge cases
  if (!operations || !operations.length) return [];
  // this is a strightforward reduce application but there are many other ways to do it
  return operations.reduce((total, [operator, number]) => operators[operator](total, number), 0);
}

/**
 * Write a function that receives an array of arrays and merges them (non-recursively)
 * into one array in order of their size (longest merged first, shortest merged last)
 * Your function should also support an array of strings
 *
 * Examples:
 *   [[1,2,3],[4],[5,6]] => [1, 2, 3, 5, 6, 4]
 *   ['123', '4', '56'] => ['1', '2', '3', '4', '5', '6']
 *
 * @param {Array} array The array of arrays or strings to merge
 * @returns {Array} the merged array
 */
export const mergeBySize = (arrays = []) => {
  // this is a little dense for a one-liner but it's a simple sort and merge via reduce
  // the reduce uses spread here for clarity but could just as easily use concat
  return (arrays || []).sort((a,b) => b.length - a.length).reduce((merged, arr) => [...merged, ...arr], [])
}
// END - Edit the functions above here


const printer = obj => JSON.stringify(obj);

const LastNComponent = <template>
  <div class="font-bold">Last N Elements</div>
  {{#let
    (array
      (array 1 2 3 4 5 6 7 8 9 10)
      (array "a" "b" "c" "d")
      (array "red" "orange" "yellow" "green" "blue" "indigo" "violet")
      null
    )
    (array 2 8 5 3)
    as |inputArrays inputNs|
  }}
    {{#each inputArrays as |inputArray index|}}
      {{#let (get inputNs index) as |inputN|}}
        <div>input array: {{printer inputArray}}</div>
        <div>input n: {{inputN}}</div>
        <div class="mb-2">output: {{printer (lastN inputArray inputN)}}</div>
      {{/let}}
    {{/each}}
  {{/let}}
</template>

const NegatoratorComponent = <template>
  <div class="font-bold">Array Negative</div>
  {{#let
    (array
      (array 1 2 3 4 5)
      (array -1 -2 -3 -4 -5)
      (array 0 1 -35 "string")
      null
    )
    as |inputArrays|
  }}
    {{#each inputArrays as |inputArray|}}
      <div>input array: {{printer inputArray}}</div>
      <div class="mb-2">output: {{printer (negatorator inputArray)}}</div>
    {{/each}}
  {{/let}}
</template>

const SanitizerComponent = <template>
  <div class="font-bold">Sanitizer</div>
  {{#let
    (array
      (array 0 "moist" 1 -1 "a" "basket" null "q" undefined 37 (array 1) 13 (array) "words" (hash a=1) 12.3 (hash))
      null
    )
    as |inputArrays|
  }}
    {{#each inputArrays as |inputArray|}}
      <div>input array: {{printer inputArray}}</div>
      <div class="mb-2">output: {{printer (sanitizer inputArray)}}</div>
    {{/each}}
  {{/let}}
</template>

const AnnoyingCalculatorComponent = <template>
  <div class="font-bold">Annoying Calculator</div>
  {{#let
    (array
      (array (array "+" 2) (array "*" 2) (array "-" 1))
      (array (array "+" 2) (array "^" 2) (array "^" 2))
      (array (array "+" 100) (array "/" 3.0) (array "*" 2))
      null
    )
    as |inputArrays|
  }}
    {{#each inputArrays as |inputArray|}}
      <div>input array: {{printer inputArray}}</div>
      <div class="mb-2">output: {{printer (annoyingCalculator inputArray)}}</div>
    {{/each}}
  {{/let}}
</template>

const MergeBySizeComponent = <template>
  <div class="font-bold">Merge by Size</div>
  {{#let
    (array
      (array (array 2 2) (array 3 3 3) (array 1) (array 4 4 4 4))
      null
    )
    as |inputArrays|
  }}
    {{#each inputArrays as |inputArray|}}
      <div>input array: {{printer inputArray}}</div>
      <div class="mb-2">output: {{printer (mergeBySize inputArray)}}</div>
    {{/each}}
  {{/let}}
</template>

export default <template>
  <LastNComponent />
  <NegatoratorComponent />
  <SanitizerComponent />
  <AnnoyingCalculatorComponent />
  <MergeBySizeComponent />
</template>
