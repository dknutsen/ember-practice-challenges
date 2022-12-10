import JavascriptFunctions from './components/javascript/functions';
import JavascriptArrays from './components/javascript/arrays';
import JavascriptObjects from './components/javascript/objects';
import DefiningRoute from './components/basics/defining-route';
import DefiningModel from './components/basics/defining-model';
import DefiningLinks from './components/basics/defining-links';
import DefiningComponent from './components/basics/defining-component';
import DefiningService from './components/basics/defining-service';
import BasicTracking from './components/autotracking/basic-tracking';
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
  javascript: {
    title: 'Javascript',
    challenges: {
      functions: {
        title: 'Functions',
        notes:
          'Javascript functions are crucially important, not only for organizing code but for writing elegant code using higher order functions. These challenges will cover concepts relating to javascript functions.',
        component: JavascriptFunctions,
      },
      arrays: {
        title: 'Arrays',
        notes:
          'Knowing how to examine and manipulate arrays is a must for writing Javascript. These challenges will cover a few of the tools and techniques we have.',
        component: JavascriptArrays,
      },
      objects: {
        title: 'Objects',
        notes:
          'Objects are a foundational concept in Javascript and can be used like hashes or classes. These challenges will cover a few of the techniques for manipulating objects/hashes.',
        component: JavascriptObjects,
      },
    },
  },
  basics: {
    title: 'Ember Basics',
    challenges: {
      'defining-route': {
        title: 'Defining a Route',
        notes:
          'To solve this challenge you should define a route and controller/template. The route should have name "secret-clubhouse" and the URL path for the route should be "top-secret/classified/" and have a dynamic segment as the last segment called "name". The template should contain a div with id "message" that contains the text: "Hello <name>, welcome to the secret clubhouse!" where <name> is the dynamic segment parameter from the route. Hint: you will need to inject the router service into the controller and access the param from the RouteInfo returned by router.currentRoute. See the Router service documentation for details.',
        // this challenge uses a component to "proxy" the route so it doesn't blow up the
        // sidebar since the route doesn't exist yet
        component: DefiningRoute,
      }, // define routes, plain and with dynamic segment
      'defining-model': {
        title: 'Defining a Model',
        notes:
          'This challenge involves building a unix-like file system model. Define a model called "file" that has attributes for file basics (name), metadata (createdAt, updatedAt), permissions (userRead, userWrite, userExecute, groupRead, groupWrite, groupExecute, otherRead, otherWrite, otherExecute). It should have relationships for "parent" and "children". It should have a computed property called "isDirectory" that returns true if the file has children. It should have a computed property called "permissions" that returns a unix-like permissions string e.g. "drwxr--r--" based on the values of the permission attributes. It should have a method called "chmod" which accepts a single argument that can either be a string in the format "drwxr--r--" or "rwxr--r--" or a number like 755, and set the permission attributes accordingly. It should also have a setter for the "permissions" property which simply calls the chmod method.',
        component: DefiningModel,
      },
      'loading-models': {
        notes:
          'To complete this challenge, use the route model hook and Ember Data to fetch the first page of "user" models from the fake backend.',
        title: 'Loading Models',
        route: 'basics.loading-models',
      },
      'defining-links': {
        title: 'Defining Links',
        notes:
          'To complete this challenge, create two links: one should be a "route link" which links to an internal application route "basics.defining-links" and also adds query param ?foo=bar, the second link should be an external link to "https://google.com" that opens in a new tab (make sure to include basic security attributes).',
        component: DefiningLinks,
      },
      'defining-component': {
        title: 'Defining a Component',
        notes:
          'To solve this challenge you must create a simple "tag" component which renders a span tag, gives it some tailwind classes, and accepts a @label and @color argument and renders them appropriately. See the target file for details.',
        component: DefiningComponent,
      },
      'defining-service': {
        title: 'Defining a Service',
        notes:
          'In this challenge we have a barebones physics system that renders bouncing balls on any number of canvases. We want to create a service that holds a couple "world" parameters and controls world physics across all canvases. You should create a service called "world" and give it three tracked state items: "gravity" a boolean that controls whether gravity is turned on or off, "gravityFactor" the acceleration that gravity imposes if gravity is turned on, "restitution" the value that determines how velocity is changed when when colliding with another object. The service should also have setter actions for these three values for convenience. Once you have the service constructed you should inject it into the WorldBar component in defining-component.gjs and then bind the Switch and NumberInputs to the appropriate values on the service.',
        component: DefiningService,
      },
      'event-binding': { title: 'Event Binding' }, // bind to events/actions with the "on" modifier
    },
  },
  autotracking: {
    title: 'Autotracking',
    challenges: {
      'basic-tracking': {
        title: 'Basic Autotracking',
        notes:
          'Autotracking is how we make state reactive. Fix this counter component by making it autotrack state mutations and re-render accordingly.',
        component: BasicTracking,
      },
      'deep-tracking': {
        title: 'Deep Tracking',
        notes:
          'Autotracking simple data types is straightforward, but with complex reference types like arrays or objects there is more nuance. In this challenge we need to fix a todo app so that it can successfully add and remove todos.',
        component: DeepTracking,
      },
      'arbitrary-tracking': {
        title: 'Arbitrary Tracking',
      },
      memoization: {
        title: 'Memoization',
      },
    },
  },
  helpers: {
    title: 'Helpers',
    challenges: {
      'function-helper': {
        title: 'Function Helper',
      },
      'class-helper': {
        title: 'Class Helper',
      },
    },
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
        notes:
          'Nested routes are an important concept when working with the Ember Router. In this challenge we want to create a parent route with two child routes that show different data from the parent model',
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
      'form-control-labels': {
        title: 'Form Control Labels',
      },
      'table-markup': {
        title: 'Table Markup',
      },
      'color-contrast': {
        title: 'Color Contrast',
      },
      'proper-headings': {
        title: 'Proper Headings',
      },
    },
  },
  refactoring: {
    title: 'Refactoring',
    challenges: {
      'classic-to-glimmer': {
        title: 'Classic to Glimmer',
        notes:
          'In this challenge we\'ll refactor a "classic" Ember Component to a Glimmer component. Note that the intent is to go from classic => glimmer but not necessarily al the way to strict-mode/SFC',
        component: ClassicToGlimmer,
      },
      'glimmer-to-sfc': {
        title: 'Glimmer to SFC',
        notes:
          "In this challenge we'll refactor a Glimmer Component to a strict-mode SFC component. Your solution should be in one *.gjs file and comply with strict mode rules.",
      },
    },
  },
};
