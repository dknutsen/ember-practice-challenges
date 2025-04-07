import JavaScript from './components/javascript';

import BasicsDefiningRoute from './components/basics/defining-route';
import BasicsDefiningModel from './components/basics/defining-model';
import BasicsDefiningLinks from './components/basics/defining-links';
import BasicsDefiningComponent from './components/basics/defining-component';
import BasicsDefiningService from './components/basics/defining-service';
import BasicsEventBinding from './components/basics/event-binding';
import AutotrackingBasicTracking from './components/autotracking/basic-tracking';
import AutotrackingDeepTracking from './components/autotracking/deep-tracking';
import AutotrackingArbitraryTracking from './components/autotracking/arbitrary-tracking';
import AutotrackingMemoization from './components/autotracking/memoization';
import HelpersFunctionHelper from './components/helpers/function-helper';
import HelpersClassHelper from './components/helpers/class-helper';
import HelpersComplexInvocation from './components/helpers/complex-invocation';
import ModifiersThirdPartyLib from './components/modifiers/third-party-lib';
import ModifiersMutatingElement from './components/modifiers/mutating-element';
import RefactoringClassicToGlimmer from './components/refactoring/classic-to-glimmer';

/**
 * This hash organizes all the challenge components into categories
 *
 * Modules / categories have a title (and could have other metadata)
 *
 * Each module / category has a hash of challenges, which each have title/etc and component
 *
 * The hash keys are the "ids" used to look up the challenges from the sidebar
 * and query params
 *
 * Each challenge can have a `component` and/or a `route`
 */
export default {
  javascript: JavaScript,
  basics: {
    title: 'Ember Basics',
    challenges: {
      'defining-route': {
        title: 'Defining a Route',
        notes:
          'To solve this challenge you should define a route and controller/template. The route should have name "secret-clubhouse" and the URL path for the route should be "top-secret/classified/" and have a dynamic segment as the last segment called "name". The template should contain a div with id "message" that contains the text: "Hello <name>, welcome to the secret clubhouse!" where <name> is the dynamic segment parameter from the route. Hint: you will need to inject the router service into the controller and access the param from the RouteInfo returned by router.currentRoute. See the Router service documentation for details.',
        // this challenge uses a component to "proxy" the route so it doesn't blow up the
        // sidebar since the route doesn't exist yet
        component: BasicsDefiningRoute,
      }, // define routes, plain and with dynamic segment
      'defining-model': {
        title: 'Defining a Model',
        notes:
          'This challenge involves building a unix-like file system model. Define a model called "file" that has attributes for file basics (name), metadata (createdAt, updatedAt), permissions (userRead, userWrite, userExecute, groupRead, groupWrite, groupExecute, otherRead, otherWrite, otherExecute). It should have relationships for "parent" and "children". It should have a computed property called "isDirectory" that returns true if the file has children. It should have a computed property called "permissions" that returns a unix-like permissions string e.g. "drwxr--r--" based on the values of the permission attributes. It should have a method called "chmod" which accepts a single argument that can either be a string in the format "drwxr--r--" or "rwxr--r--" or a number like 755, and set the permission attributes accordingly. It should also have a setter for the "permissions" property which simply calls the chmod method.',
        component: BasicsDefiningModel,
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
        component: BasicsDefiningLinks,
      },
      'defining-component': {
        title: 'Defining a Component',
        notes:
          'To solve this challenge you must create a simple "tag" component which renders a span tag, gives it some tailwind classes, and accepts a @label and @color argument and renders them appropriately. See the target file for details.',
        component: BasicsDefiningComponent,
      },
      'defining-service': {
        title: 'Defining a Service',
        notes:
          'In this challenge we have a barebones physics system that renders bouncing balls on any number of canvases. We want to create a service that holds a couple "world" parameters and controls world physics across all canvases. You should create a service called "world" and give it three tracked state items: "gravity" a boolean that controls whether gravity is turned on or off, "gravityFactor" the acceleration that gravity imposes if gravity is turned on, "restitution" the value that determines how velocity is changed when when colliding with another object. The service should also have setter actions for these three values for convenience. Once you have the service constructed you should inject it into the WorldBar component in defining-component.gjs and then bind the Switch and NumberInputs to the appropriate values on the service.',
        component: BasicsDefiningService,
      },
      'event-binding': {
        title: 'Event Binding',
        notes:
          'Event binding is an important concept for wiring DOM elements to Javascript actions. In this challenge you should replace the current onsubmit attribute on the form and bind the component onSubmit action to the form "submit" event.',
        component: BasicsEventBinding,
      },
    },
  },
  autotracking: {
    title: 'Autotracking',
    challenges: {
      'basic-tracking': {
        title: 'Basic Autotracking',
        notes:
          'Autotracking is how we make state reactive. Fix this counter component by making it autotrack state mutations and re-render accordingly.',
        component: AutotrackingBasicTracking,
      },
      'deep-tracking': {
        title: 'Deep Tracking',
        notes:
          'Autotracking simple data types is straightforward, but with complex reference types like arrays or objects there is more nuance. In this challenge we need to fix a todo app so that it can successfully add and remove todos.',
        component: AutotrackingDeepTracking,
      },
      'arbitrary-tracking': {
        title: 'Arbitrary Tracking',
        notes:
          'One powerful feature of Autotracking is that it can be used to track data on arbitrary classes, not just components. In this challenge we will build a generic Node class which we will use to power already-defined UI components to make a nested checkbox list with editing capabilities. This class is simple and abstract and could be used to back any tree-like graph. Build the Node class to make the checkbox tree work properly!',
        component: AutotrackingArbitraryTracking,
      },
      memoization: {
        title: 'Memoization',
        notes:
          'Memoization is "an optimization technique used primarily to speed up programs by storing the results of expensive operations". In this challenge, you should memoize the numberOfRows computed property so that it is only called once per render, rather than once every time a row is rendered.',
        component: AutotrackingMemoization,
      },
    },
  },
  helpers: {
    title: 'Helpers',
    challenges: {
      'function-helper': {
        title: 'Function Helper',
        notes:
          'Simple helpers can be defined as simple functions. Write a function helper that repeats a given string (first positional arg) a certain number of times (second positional arg) and uses either a given "delimiter" (named arg "delimiter") or a single space to separate the repititions',
        component: HelpersFunctionHelper,
      },
      'class-helper': {
        title: 'Class Helper',
        notes:
          'Classes can be used to defined helpers in more complex cases, such as when the helper needs its own state or needs service injections. To complete this challenge, write a class-based helper which injects the store service and returns the number of records in the store of the given type (first positional arg)',
        component: HelpersClassHelper,
      },
      'complex-invocation': {
        title: 'Complex Invocation',
        notes:
          'Helpers can be nested and composed as first-class functions to achieve complex behaviors. Helpers are nested using a Lisp-like syntax and while readability should be the primary concern it is worth knowing how to compose helpers effectively to yield complex results.',
        component: HelpersComplexInvocation,
      },
    },
  },
  modifiers: {
    title: 'Modifiers',
    challenges: {
      'mutating-element': {
        title: 'Mutating the Element',
        notes:
          'Modifiers provide a clean way to interact directly with an element in Javascript, and they can participate directly in the Reactivity system. This makes them ideal for mutating (or modifying!) the element based on changes in state. In this challenge we will build a contrived modifier that shrinks list items as the number of items increases.',
        component: ModifiersMutatingElement,
      },
      'third-party-lib': {
        title: '3rd Party Library',
        notes:
          'One great use for modifiers is encapsulating third party libraries that interact directly with DOM elements. In this challenge you should write a modifier to render a chart using the popular canvas-based Chart.js library (already added to the app dependencies).',
        component: ModifiersThirdPartyLib,
      },
      //'dom-observation': { title: 'dom-observation' },
    },
  },
  routing: {
    title: 'Routing',
    challenges: {
      //'parent-model': {
      //  title: 'Forwarding Parent Model',
      //  route: 'routing.parent-model',
      //},
      //'nested-routes': {
      //  title: 'Nested Routes',
      //  notes:
      //    'Nested routes are an important concept when working with the Ember Router. In this challenge we want to create a parent route with two child routes that show different data from the parent model',
      //  route: 'routing.nested-routes',
      //},
      //transitions: { title: 'Transitions' }, // transitions via router service and redirects
      //'query-params': { title: 'Query Params' }, // add query params and transition with them
    },
  },
  'ember-data-legacy': {
    title: 'Ember Data (Legacy)',
    challenges: {
      //'transforms': { title: 'Transforms' },
      //'sync-relationships': { title: 'Sync Relationships' },
      //'async-relationships': { title: 'Async Relationships' },
      //'serializers': { title: 'Adapters' },
      //'adapters': { title: 'Serializers' },
    },
  },
  'warp-drive': {
    title: 'Warp Drive',
    challenges: {
      //'transforms': { title: 'Transforms' },
      //'sync-relationships': { title: 'Sync Relationships' },
      //'async-relationships': { title: 'Async Relationships' },
      //'serializers': { title: 'Adapters' },
      //'adapters': { title: 'Serializers' },
    },
  },
  async: {
    title: 'Async',
    challenges: {
      //'async.actions': { title: 'Async Actions' },
      //'ember-concurrency': { title: 'Ember Concurrency' },
      //contagiousness: { title: 'Contagiousness' },
    },
  },
  'contextual-components': {
    title: 'Contextual Components',
    challenges: {},
  },
  accessibility: {
    title: 'Accessibility',
    challenges: {
      //'form-control-labels': {
      //  title: 'Form Control Labels',
      //},
      //'table-markup': {
      //  title: 'Table Markup',
      //},
      //'color-contrast': {
      //  title: 'Color Contrast',
      //},
      //'proper-headings': {
      //  title: 'Proper Headings',
      //},
    },
  },
  refactoring: {
    title: 'Refactoring',
    challenges: {
      'classic-to-glimmer': {
        title: 'Classic to Glimmer',
        notes:
          'In this challenge we\'ll refactor a "classic" Ember Component to a Glimmer component. Note that the intent is to go from classic => glimmer but not necessarily al the way to strict-mode/SFC',
        component: RefactoringClassicToGlimmer,
      },
      //'glimmer-to-sfc': {
      //  title: 'Glimmer to SFC',
      //  notes:
      //    "In this challenge we'll refactor a Glimmer Component to a strict-mode SFC component. Your solution should be in one *.gjs file and comply with strict mode rules.",
      //},
    },
  },
};
