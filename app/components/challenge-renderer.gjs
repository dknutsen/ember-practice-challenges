import challenges from '../challenges';
import * as challengeFilesHash from '../challenge-files.json';

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

const challengeFiles = (id) => {
  return challengeFilesHash?.[id];
}

const isPresent = (thing) => ![null, undefined, '', [], {}].includes(thing);

export default <template>
  <div class="p-6">
    {{!-- Render the challenge title --}}
    <h2 class="font-bold text-lg mb-2">{{challengeTitle @currentChallenge}}</h2>

    {{#if (isPresent @currentChallenge)}}
      {{!-- Render the challenge notes --}}
      <div class="mb-2">{{challengeNotes @currentChallenge}}</div>

      {{!-- Render the challenge files list --}}
      <div class="mb-2">Files to edit:
        <ul class="pl-2">
          {{#each (challengeFiles @currentChallenge) as |file|}}<li>{{file}}</li>{{/each}}
        </ul>
      </div>

      {{!-- Render the challenge tests link --}}
      <div class="mb-4"><a href="/tests?filter={{@currentChallenge}}" target="_blank" rel="noopener noreferrer" class="underline text-blue-500">Open challenge tests</a></div>

      {{!-- Render the "challenge zone" --}}
      <div id="challenge-zone" class="bg-white relative p-2 pt-6 border-dashed border-2 border-gray-400">
        <span class="text-xs font-extralight absolute top-0 left-1">Challenge Zone</span>

        {{!-- Render the challenge component, if there is one --}}
        {{#let (whichToRender @currentChallenge) as |ChallengeComponent|}} 
          <ChallengeComponent />
        {{/let}}

        {{!-- this is where a route would be rendered for route-based challenges --}}
        {{yield}}
      </div>
    {{/if}}
  </div>
</template>
