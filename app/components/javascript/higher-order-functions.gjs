// START - Edit the functions below here
/**
 * Write a function that returns a function that provides the top
 * secret variable defined below
 *
 * const funcy = higherOrderFunction();
 * console.log(funcy()); // => 'REDACTED'
 *
 * @returns {Function} a function that returns the top secret variable
 */
export const TOP_SECRET_CODE = 'REDACTED';
export const classifiedProvider = () => {

}
// END - Edit the functions above here

const invoker = (func) => func?.();

const ClassifiedProviderComponent = <template>
  <div class="font-bold">Higher Order Function</div>
  <div class="mb-2">output: {{invoker (classifiedProvider)}}</div>
</template>

const JavascriptFunctions = <template>
  <ClassifiedProviderComponent />
</template>

export default JavascriptFunctions;

const notes = `
Javascript functions are crucially important, not only for organizing code but for writing elegant code using higher order functions. These challenges will cover concepts relating to javascript functions.
`;

export const javascriptFunctions = {
  title: 'Functions',
  notes,
  component: JavascriptFunctions,
}
