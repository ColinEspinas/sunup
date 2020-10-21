
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

export {
	JSONToCSS,
}