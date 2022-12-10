import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import Button from '../ui/button';
import Switch from '../ui/switch';
import NumberInput from '../ui/number-input';
import BounceCanvas from './defining-service/bounce-canvas';

class WorldBar extends Component {
  <template>
    <div class="flex flex-wrap items-center">
      <Switch
        class="pr-4 py-2"
        @value={{this.world.gravity}}
        @label="Gravity"
        @onClick={{this.world.toggleGravity}}
      />
      <NumberInput
        class="pr-4 py-2"
        @label="Gravity Factor"
        @step={{0.1}}
        @value={{this.world.gravityFactor}}
        @onChange={{this.world.setGravityFactor}}
      />
      <NumberInput
        class="py-2"
        @label="Restitution"
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
