import Variables from './variables';
import HigherOrderFunctions from './higher-order-functions';
import Arrays from './arrays';
import Objects from './objects';

const introductionNotes = `
Learning Ember would be difficult without at least a cursory knowledge of JavaScript, the programming language of the web!

You should know the basics of JavaScript including:

- Variables
- Arrays
- Objects
- Functions
`;
const variablesNotes = `
This is not a deep-dive on variables but serves as a quick refresher on variable behavior, scoping, and a few common quirks that can trip you up.

You’ll practice:

* Declaring variables with ${'`'}let${'`'}, ${'`'}const${'`'}, and ${'`'}var${'`'}
* Understanding how scope and hoisting affect variable values
* Getting a feel for how JavaScript treats types and reassignment
`;
const functionsNotes = `
`;
const higherOrderFunctionsNotes = `
`;
const arraysNotes = `
Knowing how to examine and manipulate arrays is a must for writing Javascript. These challenges will cover a few of the tools and techniques we have.
`;
const objectsNotes = `
Objects are a foundational concept in Javascript and can be used like hashes or classes. These challenges will cover a few of the techniques for manipulating objects/hashes.
`;
export default {
  title: 'JavaScript',
  challenges: {
    introduction: {
      title: 'Introduction',
      notes: introductionNotes,
    },
    variables: {
      title: 'Variables',
      notes: variablesNotes,
      component: Variables,
    },
    functions: {
      title: 'Functions',
      notes: functionsNotes,
    },
    'higher-order-functions': {
      title: 'Higher-Order Functions',
      notes: higherOrderFunctionsNotes,
      component: HigherOrderFunctions,
    },
    arrays: {
      title: 'Arrays',
      notes: arraysNotes,
      component: Arrays,
    },
    objects: {
      title: 'Objects',
      notes: objectsNotes,
      component: Objects,
    },

  }
};
