import { array, hash } from '@ember/helper';

// START - Edit the functions below here
/**
 * Write a function that returns true if the given hash has the given key, false if not
 *
 * @param {Object} hash An object hash to check for the given key
 * @param {String} key The key to check the hash for
 * @returns {Boolean} true if the key is found in the hash, false if not
 */
export const hasKey = (hash, key) => {
  return Object.keys(hash || {}).includes(key);
}

/**
 * Write a function that swaps the keys and values in a hash
 *
 * Example: { a: 'one', b: 'two' } => { one: 'a', two: 'b' }
 *
 * @param {Object} hash An object hash to swap keys and values in
 * @returns {Object} the hash, but with keys and values swapped
 */
export const hashSwap = (hash) => {
  return Object.fromEntries(Object.entries(hash).map(([k,v]) => [v,k]));
}

/**
 * Write a function that returns a hash of character counts from the given string
 * Your function should not include whitespace or special characters, ONLY letters and digits
 * The keys in the hash should be sorted from '0' to 'z'
 *
 * @param {String} string The string to count characters in.
 * @returns {Object} a hash of characters from the string (keys) and their counts (values)
 */
export const characterCount = (string) => {
  // make sure to convert to lower case, split, and sort the characters (results in sorted keys)
  const preprocessed = (string?.toLowerCase ? string.toLowerCase() : '').split('').sort();
  // reduce the array of characters into a hash of counts
  return preprocessed.reduce((hash, char) => {
    // test the character to make sure it's alphanumeric
    if (!/^[a-z0-9]+$/.test(char)) return hash;
    hash[char] = (hash[char] || 0) + 1
    return hash;
  }, { });
}
// END - Edit the functions above here


const printer = obj => JSON.stringify(obj);

const HasKeyComponent = <template>
  <div class="font-bold">Has Key</div>
  {{#let
    (array
      (hash hash=(hash apple=1 banana=2 orange=3) key="orange")
      (hash hash=(hash apple=undefined banana=null) key="apple")
      (hash hash=(hash greenApple=2 orangey=3) key="apple")
    )
    as |inputArgs|
  }}
    {{#each inputArgs as |inputPair|}}
      <div>input hash: \{ {{#each-in inputPair.hash as |k v|}}{{k}}:{{v}}, {{/each-in}} \}</div>
      <div>input key: {{inputPair.key}}</div>
      <div class="mb-2">output: {{printer (hasKey inputPair.hash inputPair.key)}}</div>
    {{/each}}
  {{/let}}
</template>

const HashSwapComponent = <template>
  <div class="font-bold">Hash Swap</div>
  {{#let
    (array
      (hash one="blue" two="red" three="yellow")
    )
    as |inputHashes|
  }}
    {{#each inputHashes as |inputHash|}}
      <div>input string: {{printer inputHash}}</div>
      <div class="mb-2">output: {{printer (hashSwap inputHash)}}</div>
    {{/each}}
  {{/let}}
</template>

const CharacterCountComponent = <template>
  <div class="font-bold">Character Count</div>
  {{#let
    (array
      "George bought 17 zebras at the zoon for $160.99 plus tax. How many elephants did he have?"
      "Yakka Foob Mog. GRuG PubbaWup ZiNK WattooM GaZork. CHuMBLE Spuzz."
    )
    as |inputStrings|
  }}
    {{#each inputStrings as |inputString|}}
      <div>input string: {{printer inputString}}</div>
      <div class="mb-2">output: {{printer (characterCount inputString)}}</div>
    {{/each}}
  {{/let}}
</template>

export default <template>
  <HasKeyComponent />
  <HashSwapComponent />
  <CharacterCountComponent />
</template>
