/* eslint-disable */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class UserCard extends Component {
  @tracked editing = false;
  @tracked user = null;

  get fullName() {
    return `${this.args.user?.firstName} ${this.args.user?.lastName}`;
  }

  get active() {
    return this.args.active ?? true;
  }

  toggleEdit = () => {
    this.set('editing', !this.get('editing'));
  };

  save = () => {
    this.user.save();
  };
}
/* eslint-enable */
