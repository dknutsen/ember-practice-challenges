// START - Edit the functions below here
/**
 * This function is meant to return the string "safe"
 * if the secret remains unchanged by the inner block.
 *
 * Fix the code so it correctly returns "safe".
 *
 * @returns {String} The final value of `secret`
 */
export const fixTheScope = () => {
  var secret = 'safe';
  {
    var secret = 'leaked';
  }
  return secret;
};
// END - Edit the functions above here

const FixTheScopeComponent = <template>
  <div class="font-bold mb-1">Fix the Leaky Scope</div>
  <div>Expected output: <span class="font-mono text-green-600">safe</span></div>
  <div class="mb-2">Actual output: <span class="font-mono text-red-600">{{fixTheScope}}</span></div>
</template>

export default FixTheScopeComponent;
