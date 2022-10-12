import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

// NOTE: do not edit this component
export default class DefiningModel extends Component {
  @service router;

  constructor() {
    super(...arguments);
    // hacky solution to redirect to a route that may or may not exist
    // so it doesn't break the sidebar
    try {
      if (this.router.recognize('/top-secret/classified/some-id')) {
        this.router.transitionTo('secret-clubhouse', { name: 'double-o-seven' });
      }
    } catch(e) { console.log('secret-clubhouse route not defined'); }
  }

  <template>
    <div>Current Route: {{this.router.currentRouteName}}</div>
    <div>Current Route Params:
      <ul class="pl-4">
        {{#each-in this.router.currentRoute.params as |key value|}}
          <li>{{key}}: {{value}}</li>
        {{/each-in}}
      </ul>
    </div>
  </template>
}
