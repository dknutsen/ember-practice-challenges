import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WorldService extends Service {
  @tracked gravity = false;
  @tracked gravityFactor = 9.8;
  @tracked restitution = 1.0;

  @action
  toggleGravity() {
    this.gravity = !this.gravity;
  }

  @action
  setGravityFactor(newValue) {
    this.gravityFactor = newValue;
  }

  @action
  setRestitution(newValue) {
    this.restitution = newValue;
  }
}
