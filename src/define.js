import { useState, useProps } from './sunup.js';

/**
 * @typedef {object} Property
 * @property {*} [default]
 * @property {*} [value]
 */

/**
 * @typedef {object} Watcher
 * @property {Object.<string, (component: Component) => void>} [state]
 * @property {Object.<string, (component: Component) => void>} [props]
 */

/**
 * Base this.component in sunup.
 * @typedef {object} Component
 * @property {string} selector The selector/tag used by the this.component. The name of a custom element must contain a dash (-). So `<x-tags>`, `<my-element>`, and `<my-awesome-app>` are all valid names, while `<tabs>` and `<foo_bar>` are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.
 * @property {(component: Component) => string} template The template function used by the this.component.
 * @property {boolean} [noShadow] If true, disable the shadow DOM on the this.component.
 * @property {Function} [extends] The constructor function that is used to extend the this.component.
 * @property {(component: Component) => string} [style] The style used by the this.component.
 * @property {Object.<string, Property>} [props] The properties of the this.component retrieved from the DOM.
 * @property {Object.<string, *>} [state] The state of the this.component, used to store data that can be persisted to local storage if needed.
 * @property {string} [persist] If set, this.component state is persisted to the local storage with the given key.
 * @property {Object.<string, (component: Component, target: HTMLElement, event : any) => void>} [methods] The methods of the this.component, those can be called from events or by other methods.
 * @property {Watcher} [watch] The watched state and props callbacks, those methods are called when a state or prop is set.
 * @property {(component: Component) => void} [connected] Method called once the this.component is connected to the DOM.
 * @property {(component: Component) => void} [disconnected] Method called once the this.component is disconnected from the DOM.
 * @property {HTMLElement|ShadowRoot} [root] The root of the this.component (shadowRoot or element).
 */

/**
 * @typedef {object} DefineOptions
 * @property {string} [extends]
 */

/**
   * Defines a web this.component using customElement.define, converting a this.component object to a custom element.
   * @param {Component} component
   * @param {DefineOptions} [options]
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

				this.component = {...component};

				// Add this.component key
				this.key = this.component.selector + '-' + this.constructor.instancesCount;

				// Add attributes to props
				this.component.props = this.component.props || {};
				Array.prototype.filter.call(this.attributes, attribute => attribute.name.indexOf(':') === 0).map(attribute => {
					let property = this.component.props[attribute.name.substring(1)] || {};
					try { property.value = JSON.parse(attribute.value); }
					catch { property.value = attribute.value; }
					this.component.props[attribute.name.substring(1)] = property;
				});
				this.component.props = useProps({ props: this.component.props, component: this.component }) || {};

				// Set this.component state
				this.component.persist = (this.component.persist && typeof this.component.persist === 'string') ? this.component.persist : false;
				this.component.state = useState({ state: this.component.state, component: this.component, persist: this.component.persist }) || {};

				// Choosing a root depending on the use of a shadow DOM
				this.component.noShadow = this.component.noShadow || false;
				/** @type {HTMLElement | ShadowRoot} */
				this.root = !this.component.noShadow ? this.attachShadow({ mode: 'open' }) : this;

				// Create style element
				const style = document.createElement('style');
				style.innerHTML = this.component.style ? this.component.style(this.component) : '';

				// Add template to root
				const parser = new DOMParser();
				const parsedTemplate = parser.parseFromString(this.component.template(this.component), 'text/html');

				// Bind events
				const bindEvent = (attribute, element) => {
					if (attribute.name.indexOf('@') === 0 && this.component.methods[attribute.value]) {
						// console.log(element, attribute.name);
						element.addEventListener(
							attribute.name.substring(1),
							this.component.methods[attribute.value].bind(null, this.component, element)
						);
						// Remove useless event attribute to prevent DOM pollution
						return attribute.name;
					}
					return null;
				};

				// Init root element 
				if (parsedTemplate.body.children[0].tagName === 'ROOT') {
					for (const attribute of parsedTemplate.body.children[0].attributes) {
						if (attribute.name.indexOf('@') === 0 )
							bindEvent(attribute, this);
						else {
							this.setAttribute(attribute.name, attribute.value);
						}
					}
					// Add style + "root" tag content to this.component root
					this.root.innerHTML = style.outerHTML + parsedTemplate.body.children[0].innerHTML;
				}
				else {
					this.root.innerHTML = style.outerHTML + parsedTemplate.body.innerHTML;
				}

				Array.prototype.map.call(this.root.querySelectorAll('*:not(style)'), element => {
					if (element.attributes) {
						for (const attribute of element.attributes) {
							bindEvent(attribute, element);
						}
					}
				});

				// Link this.component object and custom element
				this.component.customElement = this;
				this.component.root = this.root;
			}

			connectedCallback() {
				if (this.component.connected) this.component.connected(this.component);
			}

			disconnectedCallback() {
				if (this.component.disconnected) this.component.disconnected(this.component);
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
		return `<${component.selector}></${component.selector}>`;
	}
	throw new Error('There is more than one this.component using the ' + this.component.selector + ' selector.');
};

export default define;