import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { set } from '../../../helpers/common';
import Button from '../../ui/button';
import Select from '../../ui/select';
import canvasRenderer from './canvas-renderer';
import Vector from './vector';
import Ball from './ball';
import Block from './block';
import Thing from './thing';

const randf = (max, min = 0) => min + (Math.random() * (max - min));
const randi = (max, min = 0) => Math.floor(randf(min, max));
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const MIN_RADIUS = 5.0;
const MAX_RADIUS = 20.0;
const SIZE_BUFFER = MAX_RADIUS + 5.0;

const SIZES = Object.freeze({
  sm: Object.freeze({ width: 300, height: 200 }),
  md: Object.freeze({ width: 600, height: 400 }),
  lg: Object.freeze({ width: 900, height: 600 }),
});

export default class BounceCanvas extends Component {
  @tracked size = 'sm';
  @tracked sprites = [this.newBall()];

  newBall() {
    return new Ball(
      randf(this.sizeConfig.width - SIZE_BUFFER, SIZE_BUFFER),
      randf(this.sizeConfig.height - SIZE_BUFFER, SIZE_BUFFER),
      new Vector(randf(100.0, -100.0), randf(100.0, -100.0)),
      randf(MAX_RADIUS, MIN_RADIUS),
      colors[randi(colors.length)],
    );
  }

  @action
  addBall() {
    this.sprites = [...this.sprites, this.newBall()];
  }

  @action
  popBall() {
    this.sprites = this.sprites.slice(1);
  }

  get sizeConfig() {
    console.log(SIZES[this.size]);
    return SIZES[this.size];
  }

  <template>
    <div class="flex-col">
      <canvas
        class="border border-black border-solid"
        {{canvasRenderer
          this.sprites
          width=this.sizeConfig.width
          height=this.sizeConfig.height
        }}
      >
        A canvas with moving shapes
      </canvas>
      <div class="flex items-center">
        <Select @value={{this.size}} @onChange={{set this "size"}} as |select|>
          <select.option @label="Small" @value="sm" />
          <select.option @label="Medium" @value="md" />
          <select.option @label="Large" @value="lg" />
        </Select>
        <span>Balls: {{this.sprites.length}}</span>
        <Button @label="+" @onClick={{this.addBall}} />
        <Button @label="-" @onClick={{this.popBall}} />
      </div>
    </div>
  </template>
}
