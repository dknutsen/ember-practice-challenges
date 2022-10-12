import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BasicsLoadingModelsRoute extends Route {
  @service store;

  model() {
    return this.store.query('user', { page: 1, perPage: 5 })
  }
}
