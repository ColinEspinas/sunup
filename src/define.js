
 /**
  * @param {Object} component
  * @param {String} component.selector
  * @param {Function} component.template
  * @param {Function} [component.extends]
  * @param {String} [component.style]
  * @param {Object} [component.props]
  * @param {Object} [component.data]
  * @param {Function[]} [component.methods]
  */
const define = (component) => {
	const Extends = component.extends || HTMLElement;

	customElements.define(component.selector, class extends Extends {
		constructor() {
			super();
			this.root = component.noShadow ? this : this.attachShadow({ mode: 'open' });
			const style = document.createElement('style');
			style.innerHTML = component.style;
			this.root.appendChild(style);
			this.root.innerHTML += component.template.call(null, component);
			component.root = this.root;

			// Setup events
			console.log(Array.prototype.filter.call(this.root.querySelectorAll('*:not(style)'), element => {
				if (element.attributes) {
					return Array.prototype.filter.call(
						element.attributes,
						attribute => attribute.name.indexOf('@') === 0
					).map(attribute => {
						element.addEventListener(attribute.name.substring(1), component.methods[attribute.value].bind(component));
						return attribute;
					}).length;
				}
			}).map(element => {
				return element.attributes;
			}));
		}
	});
};

export default define;