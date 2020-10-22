
 /**
	* Defines a web component using customElement.define, converting a component object to a custom element.
  * @param {Object} component
  * @param {String} component.selector
  * @param {Function} component.template
  * @param {Function} [component.extends]
  * @param {String} [component.style]
  * @param {Object} [component.props]
  * @param {Object} [component.data]
  * @param {Function[]} [component.methods]
	* 
	* @param {Object} [options]
	* @param {String} [options.extends]
  */
const define = (component, options = {}) => {
	const Extends = component.extends || HTMLElement;

	customElements.define(component.selector, class extends Extends {
		constructor() {
			super();
			this.root = component.noShadow ? this : this.attachShadow({ mode: 'open' });
			const style = document.createElement('style');
			style.innerHTML = component.style;
			this.root.appendChild(style);
			this.root.innerHTML += component.template.call(null, component);
			
			// Linking component object and custom element
			component.customElement = this;
			component.root = this.root;
			this.component = component;

			// Setup events
			Array.prototype.filter.call(this.root.querySelectorAll('*:not(style)'), element => {
				if (element.attributes) {
					return Array.prototype.filter.call(
						element.attributes, 
						attribute => attribute.name.indexOf('@') === 0)
					.map(attribute => {
						console.log(component);
						element.addEventListener(
							attribute.name.substring(1), 
							component.methods[attribute.value].bind(component, element)
						);
					});
				}
			});
		}
	}, options);
};

export default define;