const fixtures = (store) => {
  try {
    return store.createRecord('file', {
      name: 'home',
      children: [
        store.createRecord('file', { name: 'nbluth' }),
        store.createRecord('file', {
          name: 'gbluth',
          children: [
            store.createRecord('file', { name: 'banana_stand.xlsx' }),
            store.createRecord('file', { name: 'sudden-valley-ideas.txt' }),
            store.createRecord('file', { name: 'gilligan ira notes.docx' }),
            store.createRecord('file', {
              name: 'IRAQ PLANS',
              children: [
                store.createRecord('file', { name: 'model home plans 1.pdf' }),
                store.createRecord('file', { name: 'model home plans 2.pdf' }),
                store.createRecord('file', { name: 'IMG_4605.jpeg' }),
                store.createRecord('file', { name: 'IMG_4621.jpeg' }),
                store.createRecord('file', { name: 'IMG_4626.jpeg' }),
                store.createRecord('file', { name: 'IMG_4713.jpeg' }),
              ]
            }),
          ]
        }),
        store.createRecord('file', { name: 'gobbbluth' }),
      ]
    });
  } catch(e) {
    console.log('fixtures not loaded, perhaps the file model does not exist yet?');
  }
}

export default fixtures;
