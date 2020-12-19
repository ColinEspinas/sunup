import { useState } from './sunup.js';

const createApp = ({ state, router, root, component }) => {

  if (root) document.querySelector(root).outerHTML = component;
  else throw new Error("Root is invalid or undefined.");

  return {
    state: useState(state),
    router,
    root,
  }
};

export default createApp;