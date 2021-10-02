/*! Sunup v0.1.0 | MIT License | github.com/ColinEspinas/sunup */
/**
 *   ,pP"Ybd `7MM  `7MM  `7MMpMMMb.`7MM  `7MM `7MMpdMAo. 
 *   8I   `"   MM    MM    MM    MM  MM    MM   MM   `Wb 
 *   `YMMMa.   MM    MM    MM    MM  MM    MM   MM    M8 
 *   L.   I8   MM    MM    MM    MM  MM    MM   MM   ,AP 
 *   M9mmmP'   `Mbod"YML..JMML  JMML.`Mbod"YML. MMbmmd'  
 *                                              MM       
 *                                            .JMML.     
 * 
 *   This is the global export file for the sunup framework.
 */

import createApp from './app.js';
import define from './define.js';
import useState from './state.js';
import useProps from './props.js';
import { emit } from './events.js';
import { JSONToCSS, objectDeepCopy } from './utils.js';

export {
  // General:
  createApp,
  define,
  useState,
  useProps,

  // Events:
  emit,

  // Utils:
  JSONToCSS,
  objectDeepCopy,
};

export default createApp;