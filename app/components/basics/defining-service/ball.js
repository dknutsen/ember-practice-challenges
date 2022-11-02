import { tracked } from '@glimmer/tracking';
import Thing from './thing';

export default class Ball extends Thing {
  @tracked size;
  @tracked color;

  constructor(x, y, velocity, size = 10, color = 'blue') {
    super(...arguments);
    this.size = size;
    this.color = color;
  }

  get halfWidth() {
    return this.size;
  }

  get halfHeight() {
    return this.size;
  }

  get mass() {
    return Math.PI * this.size * this.size;
  }

  render(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}
