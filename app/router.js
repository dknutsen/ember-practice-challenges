import EmberRouter from '@ember/routing/router';
import config from 'practice-challenges/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('routing', function () {
    this.route('route-model');
    this.route('nested-routes');
  });
});
