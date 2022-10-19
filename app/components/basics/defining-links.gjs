import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import { inject as service } from '@ember/service';

/**
 * Create two links in the component below:
 *   1. a route link to the "basics.defining-links" route with query param ?foo=bar and text "Route link"
 *   2. an external link to "https://google.com" that opens in a new window and text "Google it"
 */
export default <template>
  <div id="route-link" class="mb-2">
    <div class="font-bold">Link to a Route</div>
    {{!-- PUT YOUR APP LINK BELOW --}}
    <LinkTo @route="basics.defining-links" @query={{hash foo="bar"}}>Route link</LinkTo>
    {{!-- PUT YOUR APP LINK ABOVE --}}
  </div>


  <div id="external-link" class="mb-2">
    <div class="font-bold">Link to External URL</div>
    {{!-- PUT YOUR EXTERNAL LINK BELOW --}}
    <a href="https://google.com" _target="blank" rel="noreferrer noopener">Google it</a> 
    {{!-- PUT YOUR EXTERNAL LINK ABOVE --}}
  </div>
</template>
