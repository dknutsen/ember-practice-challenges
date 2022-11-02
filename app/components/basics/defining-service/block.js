import { tracked } from '@glimmer/tracking';
import Thing from './thing';

export default class Ball extends Thing {
  @tracked width;
  @tracked height;
  @tracked color;

  constructor(x, y, velocity, width = 10, height = 10, color = 'blue') {
    super(...arguments);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  get halfWidth() {
    return this.width * 0.5;
  }

  get halfHeight() {
    return this.height * 0.5;
  }

  render(context) {
    context.fillStyle = this.color;
    context.fillRect(this.left, this.top, this.width, this.height);
  }
}
