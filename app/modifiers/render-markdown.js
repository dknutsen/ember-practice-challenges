import { modifier } from 'ember-modifier';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default modifier((element, [markdown]) => {
  element.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
});
