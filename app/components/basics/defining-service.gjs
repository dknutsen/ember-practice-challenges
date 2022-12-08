import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import Button from '../ui/button';
import NumberInput from '../ui/number-input';
import BounceCanvas from './defining-service/bounce-canvas';

class WorldBar extends Component {

  <template>
    <div class="flex items-center">
      <Button @label="Gravity" @onClick={{this.world.toggleGravity}} />
      <NumberInput
        aria-label="Restitution"
        @step={{0.01}}
        @value={{this.world.restitution}}
        @onChange={{this.world.setRestitution}}
      />
    </div>
  </template>
}

/**
 * Do not edit below this comment
 */
// main challenge component, renders a few canvas components
export default <template>
  <WorldBar />
  <div class="flex flex-wrap">
    <BounceCanvas />
    <BounceCanvas />
    <BounceCanvas />
    <BounceCanvas />
  </div>
</template>
