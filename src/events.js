
/**
 * Emit an event to a target
 * @param {Object} component
 * @param {string} selector 
 * @param {string} event 
 */
 const emit = (component, selector, event) => {
	const targets = component.root.querySelectorAll(selector);
	for (const target of targets) {
		target.dispatchEvent(new Event(event));
	}
}

export { 
	emit,
};