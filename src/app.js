import { useState } from './sunup.js';

/**
 * @typedef {object} AppOptions
 * @property {string} [state]
 * @property {object} [router]
 * @property {string} root
 * @property {string} component
 */

/**
 * Bootstrap a sunup application
 * @param {AppOptions} options 
 */
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