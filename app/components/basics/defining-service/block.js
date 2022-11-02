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

  get top() {
    return this.y - this.height * 0.5;
  }

  get bottom() {
    return this.y + this.height * 0.5;
  }

  get left() {
    return this.x - this.width * 0.5;
  }

  get right() {
    return this.x + this.width * 0.5;
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
