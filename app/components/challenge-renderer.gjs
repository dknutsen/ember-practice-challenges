import challenges from '../challenges';
import * as challengeFilesHash from '../challenge-files.json';
import renderMarkdown from '../modifiers/render-markdown';
import { LinkTo } from '@ember/routing';
import { hash } from '@ember/helper';

const idToChallenge = (id) => {
  const [category, challenge] = id.split('.');
  return { category, challenge };
}

const categoryFromId = (id) => {
  const { category } = idToChallenge(id);
  return challenges?.[category];
}

const challengeFromId = (id) => {
  const { challenge } = idToChallenge(id);
  const categoryConfig = categoryFromId(id);
  return categoryConfig?.challenges?.[challenge];
}

const challengeTitle = (id) => {
  const { challenge } = idToChallenge(id);
  const categoryConfig = categoryFromId(id);
  const challengeConfig = challengeFromId(id);
  if (!categoryConfig || !challengeConfig) return 'Select a challenge to get started!';
  return `${categoryConfig.title}: ${challengeConfig?.title}`;
}

const challengeNotes = (id) => {
  const challengeConfig = challengeFromId(id);
  return challengeConfig?.notes ?? '';
}

const whichToRender = (id) => {
  const challengeConfig = challengeFromId(id);
  return challengeConfig?.component;
}

const prevAndNext = (id) => {
  const { category, challenge } = idToChallenge(id);
  const categoryConfig = categoryFromId(id);
  const challenges = Object.entries(categoryConfig.challenges);
  const result = { };
  const index = challenges.findIndex(([challengeId]) => challengeId === challenge);
  if (index > 0) result.prev = `${category}.${challenges[index - 1][0]}`;
  if (index < challenges.length - 1) result.next = `${category}.${challenges[index + 1][0]}`;
  return result;
}

const challengeFiles = (id) => {
  return challengeFilesHash?.[id];
}

const isPresent = (thing) => ![null, undefined, '', [], {}].includes(thing);

const loggy = console.log;

export default <template>
  <div class="p-6">
    {{!-- Render the challenge title --}}
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-lg mb-2">{{challengeTitle @currentChallenge}}</h2>
      <div class="join grid grid-cols-2">
        {{#let (prevAndNext @currentChallenge) as |links|}}
          <LinkTo
            class="join-item btn btn-outline"
            @route="index"
            @query={{if links.prev (hash id=links.prev) (hash)}}
          >Previous</LinkTo>
          <LinkTo
            class="join-item btn btn-outline"
            @route="index"
            @query={{if links.next (hash id=links.next) (hash)}}
          >Next</LinkTo>
        {{/let}}
      </div>
    </div>

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
