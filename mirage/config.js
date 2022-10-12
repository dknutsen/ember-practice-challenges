import {
  discoverEmberDataModels,
  // applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: { ...discoverEmberDataModels(), ...config.models },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    // serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  this.resource('users');
  this.get('/users', function({ users }, { queryParams }) {
    const { page, perPage } = queryParams;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    return users.all().slice(start, end);
  });
}
