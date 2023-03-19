/* eslint-disable */
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'section',
  attributeBindings: ['data-test-component'],
  classNames: ['p-4 shadow-md'],
  classNameBindings: ['bordered:border-2', 'active'],

  'data-test-component': 'user-card',

  bordered: false,
  active: true,

  editing: false,
  user: null,

  fullName: computed('user.firstName', 'user.lastName', function () {
    return `${this.user?.firstName} ${this.user?.lastName}`;
  }),

  actions: {
    toggleEdit() {
      this.set('editing', !this.get('editing'));
    },

    save() {
      this.user.save();
    },
  },
});
/* eslint-enable */
