import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class Thing {
  id = null;
  @tracked x;
  @tracked y;
  @tracked velocity;

  get halfWidth() {
    return 0.5;
  }

  get halfHeight() {
    return 0.5;
  }

  get mass() {
    return 1.0;
  }

  get top() {
    return this.y - this.halfHeight;
  }
  get bottom() {
    return this.y + this.halfHeight;
  }
  get left() {
    return this.x - this.halfWidth;
  }
  get right() {
    return this.x + this.halfWidth;
  }

  constructor(x, y, velocity) {
    this.id = guidFor(this);
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  render(context) {
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, 1, 1);
  }

  update({ width, height, gravity, gravityFactor, restitution }, elapsed) {
    const {
      x,
      y,
      halfWidth,
      halfHeight,
      velocity: { x: normalizedX, y: normalizedY },
    } = this;
    // move object;
    this.x = x + normalizedX * elapsed;
    this.y = y + normalizedY * elapsed;

    if (gravity) this.velocity.y = this.velocity.y + gravityFactor;

    // wall collisions
    let xdiff = halfWidth - x;
    if (xdiff >= 0 && normalizedX < 0.0) {
      this.velocity.x = -1 * restitution * this.velocity.x;
      this.x = halfWidth;
    }
    xdiff = x + halfWidth - width;
    if (xdiff >= 0 && normalizedX > 0.0) {
      this.velocity.x = -1 * restitution * this.velocity.x;
      this.x = width - halfWidth;
    }
    let ydiff = halfHeight - y;
    if (ydiff >= 0 && normalizedY < 0.0) {
      this.velocity.y = -1 * restitution * this.velocity.y;
      this.y = halfHeight;
    }
    ydiff = y + halfHeight - height;
    if (ydiff >= 0 && normalizedY > 0.0) {
      this.velocity.y = -1 * restitution * this.velocity.y;
      this.y = height - halfHeight;
    }
  }

  overlaps(b) {
    // Calculate the distance between the two circles, compare to the squared sum of radiuses
    let squareDistance = (this.x - b.x) * (this.x - b.x) + (this.y - b.y) * (this.y - b.y);
    return squareDistance <= (this.size + b.size) * (this.size + b.size);
  }
}
