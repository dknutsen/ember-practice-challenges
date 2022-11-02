import { modifier } from 'ember-modifier';

export default modifier((canvas, [sprites]) => {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  sprites.forEach(sprite => sprite.render(context));
});
