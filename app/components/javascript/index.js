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
