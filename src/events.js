
/**
 * Emit an event to a target
 * @param {Object} component
 * @param {String} event 
 * @param {Object} [data]
 * @param {String} [selector]
 */
const emit = (event, { component, detail, selector } = {}) => {
  for (const target of getAllTargets(event, component, selector)) 
    target.dispatchEvent(new CustomEvent(event, { detail }));
}

/**
 * Get all targets of an event
 * @param {String} event
 * @param {Object} component
 * @param {String} selector
 */
const getAllTargets = (event, component, selector) => {
  return selector ?
    component.root.querySelectorAll(selector) :
    component ?
      component.root.querySelectorAll(`*[\\@${event}]`) :
      getAllElements().filter(element => 
        Array.prototype.filter.call(element.attributes, attribute => 
          attribute.name === `@${event}`).length > 0
      );
}

/**
 * Get all elements children of a root element
 * @param {HTMLElement} root
 */
const getAllElements = (root = document.body) => {
  let elements = !root.shadowRoot ? root.children : root.shadowRoot.querySelectorAll('*');
  if (elements.length > 0) {
    let children = [];
    return Array.prototype.filter.call(elements, (element) => {
      return element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE'
    }).map(element => {
      getAllElements(element).map(child => {
        if (child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE')
          children.push(child);
      });
      return element;
    }).concat(children);
  }
  return [];
}

export {
  emit,
};