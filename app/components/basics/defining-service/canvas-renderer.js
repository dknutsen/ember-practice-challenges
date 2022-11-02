import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import Vector from './vector';

function cleanup(instance) {
  if (instance.rafId !== null) {
    cancelAnimationFrame(instance.rafId);
    instance.rafId = null;
  }
}

export default class CanvasRenderModifier extends Modifier {
  rafId = null;
  oldTimeStamp = 0;
  annotations = [];
  debug = false;
  dampenFactor = 0.9;
  gravity = true;
  fps = 0;
  context = null;

  get dampen() {
    return this.gravity ? this.dampenFactor : 1.0;
  }

  constructor() {
    super(...arguments);
    // set up our main update loop which updates the objects and calculates collisions, etc
    // note that this does not control render, render is trigger by autotracking updates
    const update = timestamp => {
      this.update(timestamp);
      window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
    registerDestructor(this, cleanup);
  }

  modify(canvas, [sprites, width, height]) {
    this.width = width;
    this.height = height;
    this.sprites = sprites;
    if (!this.context) this.context = this.element.getContext('2d');
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.renderSprites(this.context);
    if (this.debug) this.renderDebug(this.context);
    this.context.strokeText(`${this.fps} fps`, 3, 10);
  }

  renderSprites(context) {
    this.sprites.forEach(sprite => sprite.render(context));
  }

  renderDebug(context) {
    if (this.debug) {
      this.annotations.forEach(({ text, x, y }) => context.strokeText(text, x, y));
      const qx = this.width * 0.25;
      const qy = this.height * 0.25;
      context.beginPath();
      [1, 2, 3].forEach(i => {
        context.moveTo(qx * i, 0);
        context.lineTo(qx * i, this.height);
        context.moveTo(0, qy * i);
        context.lineTo(this.width, qy * i);
      });
      context.stroke();
    }
  }

  update(timestamp) {
    const elapsed = Math.min((timestamp - this.oldTimeStamp) / 1000, 0.1);
    this.fps = Math.round(1.0 / elapsed);
    this.oldTimeStamp = timestamp;
    const { width, height, gravity, dampen } = this;
    this.sprites.forEach(s => {
      s.update({ width, height, gravity, dampen }, elapsed);
    });
    const collisions = [];
    this.calculateCollisions(collisions);
    this.processCollisions(collisions);
  }

  calculateCollisions(collisions) {
    // preprocess the sprites into collision detection zones
    //const zones = Array.from(Array(16), () => []);
    //const qx = this.width * 0.25;
    //const qy = this.height * 0.25;
    //this.sprites.forEach(s => {
    //  let zx = Math.floor(s.x / qx);
    //  if (zx > 3) zx = 3;
    //  let zy = Math.floor(s.y / qy);
    //  if (zy > 3) zy = 3;
    //  const zone = zx + zy * 4;
    //  zones[zone].push(s);
    //  const overRight = s.right > (zx + 1) * qx;
    //  const overLeft = s.left < zx * qx;
    //  const overBottom = s.bottom > (zy + 1) * qy;
    //  const overTop = s.top < zy * qy;
    //  if (overRight && zone % 4 !== 3) zones[zone + 1].push(s);
    //  if (overLeft && zone % 4 !== 0) zones[zone - 1].push(s);
    //  if (overBottom && zone <= 11) zones[zone + 4].push(s);
    //  if (overTop && zone >= 4) zones[zone - 4].push(s);
    //});
    // use the preprocessed zones to do collision calculations
    //for (let i = 0; i < zones.length; i++) {
    //  for (let j = 0; j < zones[i].length - 1; j++) {
    //    if (zones[i][j].overlaps(zones[i][j + 1])) {
    //      collisions.push({ a: zones[i][j], b: zones[i][j + 1] });
    //    }
    //  }
    //}

    // unoptimized collision calculations
    for (let i = 0; i < this.sprites.length; i++) {
      for (let j = i + 1; j < this.sprites.length; j++) {
        if (this.sprites[i].overlaps(this.sprites[j])) {
          collisions.push({ a: this.sprites[i], b: this.sprites[j] });
        }
      }
    }
  }

  processCollisions(collisions) {
    collisions.forEach(({ a, b }) => {
      const vc = new Vector(b.x - a.x, b.y - a.y);
      let vRelativeVelocity = { x: a.velocity.x - b.velocity.x, y: a.velocity.y - b.velocity.y };
      let speed = vRelativeVelocity.x * vc.normalizedX + vRelativeVelocity.y * vc.normalizedY;
      if (speed < 0) return;
      let impulse = ((2 * speed) / (a.mass + b.mass)) * this.dampen;
      a.velocity.x -= impulse * b.mass * vc.normalizedX;
      a.velocity.y -= impulse * b.mass * vc.normalizedY;
      b.velocity.x += impulse * a.mass * vc.normalizedX;
      b.velocity.y += impulse * a.mass * vc.normalizedY;
    });
  }
}
