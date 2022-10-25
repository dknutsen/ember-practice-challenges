/**
 * Either export a component from here (if using SFC template strict mode)
 * or rename this file to `tag.hbs` and create a glimmer component.
 *
 * Your component should:
 *   - render a <span> tag
 *   - accept a @label argument, and render it inside the span tag with a `#` prefix
 *   - accept a @color argument, and add a class to the span tag like `bg-<color>-600` but
 *     only if the arg is valid: 'blue', 'green', 'yellow', 'orange', 'red', 'gray'
 *   - add some more classes to the span tag: `px-2` `py-1` `m-1` `rounded-md` `text-white`
 */

// Note there are many ways to implement this component. This is just one of the most
// simple and straightforward

// define a hash of color classes
const colors = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  yellow: 'bg-yellow-600',
  orange: 'bg-orange-600',
  red: 'bg-red-600',
  gray: 'bg-gray-600',
}

// define a helper to fetch the right class (could also be done in a computed getter)
const colorClass = (color) => colors[color];

// export a template-only component
export default <template>
  <span class="px-2 py-1 m-1 rounded-md text-white {{colorClass @color}}">
    #{{@label}}
  </span>
</template>
