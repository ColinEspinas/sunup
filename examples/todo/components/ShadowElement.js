import { define } from '../../../src/sunup.js';

export default define({
  selector: 'shadow-element',
  template: ({ props }) => /*html*/`
    <slot></slot>
  `,
});