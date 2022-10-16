import { array, get } from '@ember/helper';

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
// END - Edit the functions above here


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
        <div>input array: {{inputArray}}</div>
        <div>input n: {{inputN}}</div>
        <div class="mb-2">output: {{lastN inputArray inputN}}</div>
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
      <div>input array: {{inputArray}}</div>
      <div class="mb-2">output: {{negatorator inputArray}}</div>
    {{/each}}
  {{/let}}
</template>

export default <template>
  <LastNComponent />
  <NegatoratorComponent />
</template>
