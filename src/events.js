
/**
 * Emit an event to a target
 * @param {Object} component
 * @param {string} event 
 * @param {Object} [data]
 * @param {string} [selector]
 */
const emit = (event, { component, detail, selector } = {}) => {
	const targets = getAllTargets({ event, component, selector });
	for (const target of targets) {
		target.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
	}
}

const getAllTargets = ({ event, component, selector }) => {
	let targets = [];
	targets = selector ?
		component.root.querySelectorAll(selector) :
		component ?
			component.root.querySelectorAll(`*[\\@${event}]`) :
			getAllElements();
	return targets;
}

const getAllElements = (root = document.body) => {
	let elements = !root.shadowRoot ? root.children : root.shadowRoot.querySelectorAll('*');
	elements = Array.prototype.filter.call(elements, (element) => element.tagName !== 'SCRIPT');
	let elementsToAdd = [];
	for (const element of elements) {
		const newElements = getAllElements(element);
		for (const e of newElements) {
			if (e.tagName !== 'script')
				elementsToAdd.push(e);
		}
	}
	return elements.concat(elementsToAdd);
}

// const flatArray = (array) => {
// 	let flatArray = []
// 	for (let index = 0; index < array.length; index++) {
// 		const element = array[index];
// 		if (Array.isArray(element)) {
// 			flatArray = flatArray.concat(array.flatten.call(element))
// 		} else {
// 			flatArray.push(element)
// 		}
// 	}
// 	return flatArray;
// }

export {
	emit,
};