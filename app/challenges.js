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
 *
 * Each challenge can have either a `component` or a `route`
 */
export default {
  autotracking: {
    title: 'Autotracking',
    challenges: {
      'deep-tracking': { title: 'Deep Tracking', component: DeepTracking },
    },
  },
  'ember-data': {
    title: 'Ember Data',
    challenges: {},
  },
  helpers: {
    title: 'Helpers',
    challenges: {},
  },
  modifiers: {
    title: 'Modifiers',
    challenges: {},
  },
  'contextual-components': {
    title: 'Contextual Components',
    challenges: {},
  },
  accessibility: {
    title: 'Accessibility',
    challenges: {},
  },
  routing: {
    title: 'Routing',
    challenges: {
      'route-model': { title: 'Route Model', route: 'routing.route-model' },
      'nested-routes': {
        title: 'Nested Routes',
        notes: 'Nested routes are an important concept when working with the Ember Router. In this challenge we want to create a parent route with two child routes that show different data from the parent model',
        route: 'routing.nested-routes',
      },
    },
  },
};
