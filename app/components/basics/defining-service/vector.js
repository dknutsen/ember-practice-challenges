import { tracked } from '@glimmer/tracking';

export default class Vector {
  @tracked x = 0;
  @tracked y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get normalizedX() {
    return this.x / this.magnitude;
  }

  get normalizedY() {
    return this.y / this.magnitude;
  }
}
