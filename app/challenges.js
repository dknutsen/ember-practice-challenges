import DeepTracking from './components/autotracking/deep-tracking';

/**
 * This hash organizes all the challenge components into categories
 * 
 * Categories have a title (and could have other metadata)
 * 
 * Each category has a hash of challenges, which each have title/etc and component
 * 
 * The hash keys are the "ids" used to look up the challenges from the sidebar
 * and query params
 */
export default {
  autotracking: {
    title: 'Autotracking',
    challenges: {
      'deep-tracking': {
        title:     'Deep Tracking',
        component: DeepTracking,
      },
    },
  },
  'ember-data': {
    title: 'Ember Data',
    challenges: { },
  },
  helpers: {
    title: 'Helpers',
    challenges: { },
  },
  modifiers: {
    title: 'Modifiers',
    challenges: { },
  },
  'contextual-components': {
    title: 'Contextual Components',
    challenges: { },
  },
  accessibility: {
    title: 'Accessibility',
    challenges: { },
  },
};

