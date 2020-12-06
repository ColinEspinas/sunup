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
 * Base component in sunup.
 * @typedef {object} Component
 * @property {string} selector The selector/tag used by the component. The name of a custom element must contain a dash (-). So `<x-tags>`, `<my-element>`, and `<my-awesome-app>` are all valid names, while `<tabs>` and `<foo_bar>` are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.
 * @property {(component: Component) => string} template The template function used by the component.
 * @property {boolean} [noShadow] If true, disable the shadow DOM on the component.
 * @property {Function} [extends] The constructor function that is used to extend the component.
 * @property {(component: Component) => string} [style] The style used by the component.
 * @property {Object.<string, Property>} [props] The properties of the component retrieved from the DOM.
 * @property {Object.<string, *>} [state] The state of the component, used to store data that can be persisted to local storage if needed.
 * @property {string} [persist] If set, component state is persisted to the local storage with the given key.
 * @property {Object.<string, (component: Component, target: HTMLElement) => void>} [methods] The methods of the component, those can be called from events or by other methods.
 * @property {Watcher} [watch] The watched state and props callbacks, those methods are called when a state or prop is set.
 * @property {(component: Component) => void} [connected] Method called once the component is connected to the DOM.
 * @property {(component: Component) => void} [disconnected] Method called once the component is disconnected from the DOM.
 * @property {HTMLElement|ShadowRoot} [root] The root of the component (shadowRoot or element).
 */

/**
 * @typedef {object} DefineOptions
 * @property {string} [extends]
 */

/**
   * Defines a web component using customElement.define, converting a component object to a custom element.
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
				/** @type {HTMLElement | ShadowRoot} */
				this.root = !component.noShadow ? this.attachShadow({ mode: 'open' }) : this;

				// Add style to root
				const style = document.createElement('style');
				style.innerHTML = component.style ? component.style(component) : '';
				this.root.appendChild(style);

				// Add template to root
				this.root.innerHTML += component.template(component);

				// Bind events
				const bindEvent = (attribute, element) => {
					if (attribute.name.indexOf('@') === 0 && component.methods[attribute.value]) {
						element.addEventListener(
							attribute.name.substring(1),
							component.methods[attribute.value].bind(null, component, element)
						);
						// Remove useless event attribute to prevent DOM pollution
						element.removeAttribute(attribute.name);
					}
				};
				if (this.root.children[1].tagName === 'ROOT') {
					for (const attribute of this.root.children[1].attributes) {
						if (attribute.name.indexOf('@') === 0 )
							bindEvent(attribute, this);
						else {
							this.setAttribute(attribute.name, attribute.value);
						}
					}
					this.root.innerHTML = this.root.children[1].innerHTML;
				};
				Array.prototype.map.call(this.root.querySelectorAll('*:not(style)'), element => {
					if (element.attributes) {
						Array.prototype.map.call(
							element.attributes,
							attribute => bindEvent(attribute, element)
						);
					}
				});

				// Linking component object and custom element
				component.customElement = this;
				component.root = this.root;
				this.component = component;
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