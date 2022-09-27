import DeepTracking from './autotracking/deep-tracking';

const components = {
  'autotracking.e02': DeepTracking,
};
const whichToRender = (name) => components[name];

export default <template>
  <div class="p-2">
    <h2 class="font-bold text-lg">{{@currentExample}}</h2>
    {{#let (whichToRender @currentExample) as |Example|}} 
      <Example />
    {{/let}}
  </div>
</template>
