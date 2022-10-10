import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:           'section',
  classNames:        ['p-4 shadow-md'],
  classNameBindings: ['bordered:border-2', 'active'],

  bordered: false,
  active:   true,

  editing: false,
  user:    null,

  fullName: computed('user.firstName', 'user.lastName', function() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }),

  actions: {
    save() {
      this.user.save();
    },
  },
});
