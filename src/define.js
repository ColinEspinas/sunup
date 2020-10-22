
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
	if (!customElements.get(component.selector)) {
		const Extends = component.extends || HTMLElement;
		customElements.define(component.selector, class extends Extends {
			constructor() {
				super();

				// Add attributes to props
				component.props = component.props || {};
				Array.prototype.filter.call(this.attributes, attribute => attribute.name.indexOf(':') === 0).map(attribute => {
						component.props[attribute.name.substring(1)] = attribute.value;
				});

				// Choosing a root depending on the use of a shadow DOM
				this.root = component.noShadow ? this : this.attachShadow({ mode: 'open' });

				// Add style to root
				const style = document.createElement('style');
				style.innerHTML = component.style(component);
				this.root.appendChild(style);

				// Add template to root
				this.root.innerHTML += component.template.call(null, component);
				
				// Linking component object and custom element
				component.customElement = this;
				component.root = this.root;
				this.component = component;
				console.log(this.component);

				// Setup events
				Array.prototype.filter.call(this.root.querySelectorAll('*:not(style)'), element => {
					if (element.attributes) {
						return Array.prototype.map.call(
							element.attributes, 
							attribute => {
								if (attribute.name.indexOf('@') === 0) {
									element.addEventListener(
										attribute.name.substring(1), 
										component.methods[attribute.value].bind(component, element)
									);
								}
							});
					}
				});
			}
		}, options);
	}
	else {
		console.warn('There is more than one component using the ' + component.selector + ' selector.');
	}
};

export default define;