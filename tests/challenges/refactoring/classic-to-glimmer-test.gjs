import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-practice-challenges/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import UserCard from 'ember-practice-challenges/components/refactoring/classic-to-glimmer/user-card';

const component = '[data-test-component="user-card"]';
const cardTitle = '[data-test-card="title"]';
const attribute = (label) => `${component} [data-test-attribute="${label}"]`;
const attrLabel = (label) => `${attribute(label)} dt`;
const attrValue = (label) => `${attribute(label)} dd`;

module('Challenges | refactoring.classic-to-glimmer', function (hooks) {
  setupRenderingTest(hooks);

  test('the UserCard component is a Glimmer component', async function (assert) {
    assert.true(
      Object.getPrototypeOf(UserCard).name.toLowerCase().includes('glimmer'),
      'The UserCard component is extended from @glimmer/component'
    );
  });

  module('Card tests', function(hooks) {
    let user;
    hooks.beforeEach(function() {
      const store = this.owner.lookup('service:store');
      user = store.createRecord('user', { firstName: 'bob', lastName: 'bobberson', email: 'bobbbb@@bobberson.com' });
    });

    test('the UserCard has the correct outer tag markup', async function (assert) {
      await render(
        <template>
          <UserCard @user={{user}} />
        </template>
      );
      assert
        .dom(component)
        .hasTagName('section', 'the component has a <section> tag');
      assert.dom(component).hasClass('p-4');
      assert.dom(component).hasClass('shadow-md');
      assert.dom(component).hasClass('active', 'the card has "active" class by default');
      assert.dom(component).doesNotHaveClass('border-2', 'the card is not bordered by default');
    });
  
    test('the UserCard styles change when bordered and active values are changed', async function (assert) {
      let bordered = true;
      let active = false;
      await render(
        <template>
          <UserCard @user={{user}} @bordered={{bordered}} @active={{active}} />
        </template>
      );
      assert.dom(component).doesNotHaveClass('active', 'the card does not have "active" calss');
      assert.dom(component).hasClass('border-2', 'the card is bordered');
    });

    test('the UserCard renders the correct data', async function (assert) {
      await render(
        <template>
          <UserCard @user={{user}} />
        </template>
      );
      assert.dom(cardTitle).hasText(`${user.firstName} ${user.lastName}`);
      assert.dom(attrValue('First Name')).hasText(user.firstName);
      assert.dom(attrValue('Last Name')).hasText(user.lastName);
      assert.dom(attrValue('Email')).hasText(user.email);
    });
  });
});
