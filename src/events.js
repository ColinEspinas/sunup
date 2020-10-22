
/**
 * Emit an event to a target
 * @param {Object} component
 * @param {string} event 
 * @param {string} [selector] 
 */
const emit = (component, event, selector) => {
	const targets = selector ? 
		component.root.querySelectorAll(selector) : 
		component.root.querySelectorAll(`*[\\@${event}]`);
	for (const target of targets) {
		target.dispatchEvent(new Event(event));
	}
}

export { 
	emit,
};