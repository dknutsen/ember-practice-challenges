import DeepTracking from './autotracking/deep-tracking';

const components = {
  'autotracking.e02': DeepTracking,
};
const whichToRender = (name) => components[name];

export default <template>
  {{#let (whichToRender @currentExample) as |Example|}} 
    <Example />
  {{/let}}
</template>
