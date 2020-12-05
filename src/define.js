import { useState, useProps } from './sunup.js';

/**
   * Defines a web component using customElement.define, converting a component object to a custom element.
   * @param {Object} component
   * @param {String} component.selector
   * @param {Boolean} [component.noShadow]
   * @param {Function} component.template
   * @param {Function} [component.extends]
   * @param {String} [component.style]
   * @param {Object} [component.props]
   * @param {Object} [component.state]
   * @param {String} [component.persist]
   * @param {Function[]} [component.methods]
   * @param {Object} [options]
   * @param {String} [options.extends]
 */
const define = (component, options = {}) => {
	if (!customElements.get(component.selector)) {
		const Extends = component.extends || HTMLElement;
		customElements.define(component.selector, class extends Extends {
			static get observedAttributes() {
				return (
					component.props ? Object.keys(component.props).map(prop => {
						return ':' + prop;
					}) : []
				);
			}
			static instancesCount;

			constructor() {
				super();
				this.constructor.instancesCount = (this.constructor.instancesCount || 0) + 1;

				// Add component key
				this.key = component.selector + '-' + this.constructor.instancesCount;

				// Add attributes to props
				component.props = component.props || {};
				Array.prototype.filter.call(this.attributes, attribute => attribute.name.indexOf(':') === 0).map(attribute => {
					let property = component.props[attribute.name.substring(1)] || {};
					property.value = attribute.value;
					component.props[attribute.name.substring(1)] = property;
				});
				component.props = useProps({ props: component.props, component }) || {};

				// Set component state
				component.persist = (component.persist && typeof component.persist === 'string') ? component.persist : false;
				component.state = useState({ state: component.state, component, persist: component.persist }) || {};

				// Choosing a root depending on the use of a shadow DOM
				component.noShadow = component.noShadow || false;
				this.root = !component.noShadow ? this.attachShadow({ mode: 'open' }) : this;

				// Add style to root
				const style = document.createElement('style');
				style.innerHTML = component.style(component);
				this.root.appendChild(style);

				// Add template to root
				this.root.innerHTML += component.template(component);

				// Linking component object and custom element
				component.customElement = this;
				component.root = this.root;
				this.component = component;

				// Setup events
				Array.prototype.filter.call(this.root.querySelectorAll('*:not(style)'), element => {
					if (element.attributes) {
						Array.prototype.map.call(
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

			connectedCallback() {
				if (component.connected) component.connected(component);
			}

			disconnectedCallback() {
				if (component.disconnected) component.disconnected(component);
			}

			attributeChangedCallback(prop, old, current) {
				if (old !== current) {
					this.component.props[prop.substring(1)] = {
						force: true,
						value: current,
					};
				}
			}
		}, options);
	}
	else {
		console.warn('There is more than one component using the ' + component.selector + ' selector.');
	}
};

export default define;