import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { inject as service } from '@ember/service';
import Button from '../ui/button';
import Switch from '../ui/switch';
import NumberInput from '../ui/number-input';
import BounceCanvas from './defining-service/bounce-canvas';

class WorldBar extends Component {
  // inject the service
  @service world;

  <template>
    <div class="flex flex-wrap items-center justify-between">
      <Switch
        class="pr-4 py-2"
        @label="Gravity"
        @value={{this.world.gravity}}
        @onClick={{this.world.toggleGravity}}
      />
      <div class="flex">
        <NumberInput
          @label="Gravity Factor"
          @step={{0.1}}
          @value={{this.world.gravityFactor}}
          @onChange={{this.world.setGravityFactor}}
        />
        <NumberInput
          @label="Restitution"
          @step={{0.01}}
          @value={{this.world.restitution}}
          @onChange={{this.world.setRestitution}}
        />
      </div>
    </div>
    <div class="divider"></div>
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
