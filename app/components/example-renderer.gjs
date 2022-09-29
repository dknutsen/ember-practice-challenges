import challenges from '../challenges';

const whichToRender = (id) => {
  const [category, challenge] = id.split('.');
  return challenges?.[category]?.challenges?.[challenge]?.component;
}

const challengeTitle = (id) => {
  const [category, challenge] = id.split('.');
console.log(category, challenge);
  if (!category || !challenge) return 'Select a challenge to get started!';
  const cat = challenges?.[category];
  return `${cat?.title}: ${cat?.challenges?.[challenge]?.title}`;
}

export default <template>
  <div class="p-2">
    <h2 class="font-bold text-lg">{{challengeTitle @currentExample}}</h2>
    {{#let (whichToRender @currentExample) as |ChallengeComponent|}} 
      <ChallengeComponent />
    {{/let}}
  </div>
</template>
