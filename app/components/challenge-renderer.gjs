import challenges from '../challenges';

const whichToRender = (id) => {
  const [category, challenge] = id.split('.');
  return challenges?.[category]?.challenges?.[challenge]?.component;
}

const challengeTitle = (id) => {
  const [category, challenge] = id.split('.');
  if (!category || !challenge) return 'Select a challenge to get started!';
  const cat = challenges?.[category];
  return `${cat?.title}: ${cat?.challenges?.[challenge]?.title}`;
}

const challengeNotes = (id) => {
  const [category, challenge] = id.split('.');
  if (!category || !challenge) return '';
  const cat = challenges?.[category];
  return cat?.challenges?.[challenge]?.notes;
}

export default <template>
  <div class="p-2">
    {{!-- Render the challenge title --}}
    <h2 class="font-bold text-lg mb-2">{{challengeTitle @currentChallenge}}</h2>

    {{!-- Render the challenge notes --}}
    <div class="mb-4">{{challengeNotes @currentChallenge}}</div>

    {{!-- Render the challenge component, if there is one --}}
    <div id="challenge-zone" class="relative p-2 pt-4 border-dashed border-2 border-gray-400">
      <span class="text-xs font-extralight absolute top-0 left-1">Challenge Zone</span>

      {{#let (whichToRender @currentChallenge) as |ChallengeComponent|}} 
        <ChallengeComponent />
      {{/let}}
  
      {{!-- this is where a route would be rendered for route-based challenges --}}
      {{yield}}
    </div>
  </div>
</template>
