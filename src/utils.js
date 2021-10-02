
/**
 * Converts JSON to CSS
 * @param {Object} JSONStyle 
 */
const JSONToCSS = (JSONStyle) => {
  return Object.keys(JSONStyle).map(function(selector) {
    const properties = JSONStyle[selector];
    return `${selector}{${Object.keys(properties).map(property => `${property}: ${properties[property]}`)}}`;
  }).join('');
}

/**
 * Deep copy an object. 
 * From [this article](https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089).
 * @param {Object} inObject Object to copy
 * @returns Deep copied object
 */
const objectDeepCopy = (inObject) => {
  let outObject, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = objectDeepCopy(value);
  }
  return outObject;
}


export {
  JSONToCSS,
  objectDeepCopy,
}