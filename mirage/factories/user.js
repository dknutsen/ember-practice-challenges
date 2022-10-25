import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  createdAt: () => faker.date.past(),
  updatedAt: () => faker.date.recent(),
});
