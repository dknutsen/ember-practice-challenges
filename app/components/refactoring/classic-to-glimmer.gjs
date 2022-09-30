import Component from '@glimmer/component';

// NOTE: do not edit this component, edit the user-card child component
// imported and rendered here
import UserCard from './classic-to-glimmer/user-card';

export default class ClassicToGlimmer extends Component {
  user = { firstName: 'Bob', lastName: 'Loblaw', email: 'bob@bobloblawslawblog.com' };

  <template>
    <UserCard @user={{this.user}} />
  </template>
}
