import DeepTracking from './components/autotracking/deep-tracking';
import ClassicToGlimmer from './components/refactoring/classic-to-glimmer';

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
 * Each challenge can have a `component` and/or a `route`
 */
export default {
  basics: {
    title: 'Ember Basics',
    challenges: {
      'defining-route': { title: 'Defining a Route' }, // define routes, plain and with dynamic segment
      'defining-model': { title: 'Defining a Model' }, // create a model (unit test it for completion)
      'loading-models': {
        // load query in route and render in template
        title: 'Loading Models',
        route: 'basics.loading-models',
      },
      'defining-links': { title: 'Defining Links' }, // internal and external links
      'defining-component': { title: 'Defining a Component' }, // define a basic read-only component
      'define-service': { title: 'Defining a Service' }, // define simple service (clock?) and inject
    },
  },
  autotracking: {
    title: 'Autotracking',
    challenges: {
      'deep-tracking': {
        title: 'Deep Tracking',
        notes: 'Autotracking simple data types is straightforward, but with complex reference types like arrays or objects there is more nuance. In this challenge we need to fix a todo app so that it can successfully add and remove todos.',
        component: DeepTracking,
      },
    },
  },
  helpers: {
    title: 'Helpers',
    challenges: {},
  },
  modifiers: {
    title: 'Modifiers',
    challenges: {},
  },
  routing: {
    title: 'Routing',
    challenges: {
      'route-model': {
        title: 'Forwarding Parent Model',
        route: 'routing.route-model',
      },
      'nested-routes': {
        title: 'Nested Routes',
        notes: 'Nested routes are an important concept when working with the Ember Router. In this challenge we want to create a parent route with two child routes that show different data from the parent model',
        route: 'routing.nested-routes',
      },
      transitions: { title: 'Transitions' }, // transitions via router service and redirects
      'query-params': { title: 'Query Params' }, // add query params and transition with them
    },
  },
  'ember-data': {
    title: 'Ember Data',
    challenges: {},
  },
  async: {
    title: 'Async',
    challenges: {
      'async.actions': { title: 'Async Actions' },
      'ember-concurrency': { title: 'Ember Concurrency' },
      contagiousness: { title: 'Contagiousness' },
    },
  },
  'contextual-components': {
    title: 'Contextual Components',
    challenges: {},
  },
  accessibility: {
    title: 'Accessibility',
    challenges: {
      'form-control-labels': { title: 'Form Control Labels' },
      'table-markup': { title: 'Table Markup' },
      'color-contrast': { title: 'Color Contrast' },
      'proper-headings': { title: 'Proper Headings' },
    },
  },
  refactoring: {
    title: 'Refactoring',
    challenges: {
      'classic-to-glimmer': {
        title: 'Classic to Glimmer',
        notes: 'In this challenge we\'ll refactor a "classic" Ember Component to a Glimmer component. Note that the intent is to go from classic => glimmer but not necessarily al the way to strict-mode/SFC',
        component: ClassicToGlimmer,
      },
      'glimmer-to-sfc': {
        title: 'Glimmer to SFC',
        notes: "In this challenge we'll refactor a Glimmer Component to a strict-mode SFC component. Your solution should be in one *.gjs file and comply with strict mode rules.",
      },
    },
  },
};
