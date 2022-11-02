import { tracked } from '@glimmer/tracking';

export default class Thing {
  @tracked x;
  @tracked y;
  @tracked velocity;
  @tracked speed = 50.0;

  get halfWidth() {
    return 0.5;
  }

  get halfHeight() {
    return 0.5;
  }

  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  render(context) {
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, 1, 1);
  }

  update({ width, height, gravity }, elapsed) {
    const {
      x,
      y,
      halfWidth,
      halfHeight,
      velocity: { normalizedX, normalizedY },
    } = this;
    // move object;
    const multiplier = elapsed * this.speed;
    this.x = x + normalizedX * multiplier;
    this.y = y + normalizedY * multiplier;

    // wall collisions
    let xdiff = halfWidth - x;
    if (xdiff > 0 && normalizedX < 0.0) {
      this.velocity.x = -1 * this.velocity.x;
      this.x = x + (normalizedX - xdiff);
    }
    xdiff = x + halfWidth - width;
    if (xdiff > 0 && normalizedX > 0.0) {
      this.velocity.x = -1 * this.velocity.x;
      this.x = x - (normalizedX - xdiff);
    }
    let ydiff = halfHeight - y;
    if (ydiff > 0 && normalizedY < 0.0) {
      this.velocity.y = -1 * this.velocity.y;
      this.y = y + (normalizedY - ydiff);
    }
    ydiff = y + halfHeight - height;
    if (ydiff > 0 && normalizedY > 0.0) {
      this.velocity.y = -1 * this.velocity.y;
      this.y = y - (normalizedY - ydiff);
    }
  }
}
