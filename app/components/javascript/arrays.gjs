import { array, get, hash } from '@ember/helper';

// START - Edit the functions below here
/**
 * Write a function that returns the last n elements of the given array
 * @param {Array} array The source array to get the last n elements from
 * @param {Number} n The number of elements to return from the end of the array
 * @returns {Array} an array of the last n (or array.length if lesser than n) elements
 */
export const lastN = (array = [], n = 1) => {

}

/**
 * Write a function that returns the input array but with all elements "negated"
 * e.g. [1,2,-4] => [-1,-2,4]
 * @param {Array} array The source array to create a "negative" for
 * @returns {Array} the "negative" of the input array
 */
export const negatorator = (array = []) => {

}

/**
 * Write a function that returns the input array but without any yucky elements.
 * A not-yucky element:
 *   - must be > 0
 *   - must not be empty (null, undefined, '', [], {})
 *   - must not be: the letter 'q', the number '13' or the word 'moist'
 *
 * @param {Array} array The source array to sanitize
 * @returns {Array} the sanitized array
 */
export const sanitizer = (array = []) => {

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
export const annoyingCalculator = (operations = []) => {

}

/**
 * Write a function that receives an array of arrays and merges them (non-recursively)
 * into one array in order of their size (longest merged first, shortest merged last)
 *
 * Example:
 *   [[1,2,3],[4],[5,6]] => [1, 2, 3, 5, 6, 4]
 *
 * @param {Array} array The source array to sanitize
 * @returns {Array} the sanitized array
 */
export const mergeBySize = (arrays = []) => {

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
