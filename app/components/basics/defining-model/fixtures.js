import { faker } from '@faker-js/faker';

const fixtures = (store) => {
  try {
    const fileModelExists = store.modelFor('file');
    if (!fileModelExists) return;
    const owner = store.createRecord('user', { email: 'root@root.com' });
    const newFile = (name, children) => store.createRecord('file', { name, owner, updatedAt: faker.date.recent(), ...children && { children } });
    return newFile('home', [
        newFile('nbluth'),
        newFile('gbluth', [
          newFile('banana_stand.xlsx'),
          newFile('sudden-valley-ideas.txt'),
          newFile('gilligan ira notes.docx'),
          newFile('IRAQ PLANS', [
            newFile('model home plans 1.pdf'),
            newFile('model home plans 2.pdf'),
            newFile('IMG_4605.jpeg'),
            newFile('IMG_4621.jpeg'),
            newFile('IMG_4626.jpeg'),
            newFile('IMG_4713.jpeg'),
          ]),
        ]),
        newFile('gobbbluth'),
    ]);
  } catch(e) {
    console.log('fixtures not loaded, perhaps the file model does not exist yet?');
  }
}

export default fixtures;
