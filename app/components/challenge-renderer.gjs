import challenges from '../challenges';
import * as challengeFilesHash from '../challenge-files.json';
import renderMarkdown from '../modifiers/render-markdown';

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
      <div class="mb-2 prose" {{renderMarkdown (challengeNotes @currentChallenge)}}></div>

      {{!-- Render the challenge files list --}}
      {{#if (challengeFiles @currentChallenge)}}
        <div role="alert" class="alert alert-info alert-soft">
          <div>
            <div>These are the files you will need to edit:</div>
            <ul class="pl-2 py-2">
              {{#each (challengeFiles @currentChallenge) as |file|}}
                <li><pre data-prefix=">"><code>{{file}}</code></pre></li>
              {{/each}}
            </ul>
          </div>
        </div>
      {{/if}}

      {{!-- Render the "challenge zone" --}}
      {{#let (whichToRender @currentChallenge) as |ChallengeComponent|}}
        {{#if ChallengeComponent}}
          <div class="mockup-browser border bg-base-300 border-base-300 w-full">
            <div class="mockup-browser-toolbar justify-between">
              <div class="text-sm">The Challenge Zone</div>
              <div><a href="/tests?filter={{@currentChallenge}}" target="_blank" rel="noopener noreferrer" class="underline text-blue-500">Open challenge tests</a></div>
            </div>
            <div class="p-6">
              {{!-- Render the challenge component, if there is one --}}
                <ChallengeComponent />

              {{!-- this is where a route would be rendered for route-based challenges --}}
              {{yield}}
            </div>
          </div>
        {{/if}}
      {{/let}}
    {{/if}}
  </div>
</template>
