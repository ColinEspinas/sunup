export default define;
export type Property = {
    default?: any;
    value?: any;
};
export type Watcher = {
    state?: {
        [x: string]: (component: Component) => void;
    };
    props?: {
        [x: string]: (component: Component) => void;
    };
};
/**
 * Base this.component in sunup.
 */
export type Component = {
    /**
     * The selector/tag used by the this.component. The name of a custom element must contain a dash (-). So `<x-tags>`, `<my-element>`, and `<my-awesome-app>` are all valid names, while `<tabs>` and `<foo_bar>` are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.
     */
    selector: string;
    /**
     * The template function used by the this.component.
     */
    template: (component: Component) => string;
    /**
     * If true, disable the shadow DOM on the this.component.
     */
    noShadow?: boolean;
    /**
     * The constructor function that is used to extend the this.component.
     */
    extends?: Function;
    /**
     * The style used by the this.component.
     */
    style?: (component: Component) => string;
    /**
     * The properties of the this.component retrieved from the DOM.
     */
    props?: {
        [x: string]: Property;
    };
    /**
     * The state of the this.component, used to store data that can be persisted to local storage if needed.
     */
    state?: {
        [x: string]: any;
    };
    /**
     * If set, this.component state is persisted to the local storage with the given key.
     */
    persist?: string;
    /**
     * The methods of the this.component, those can be called from events or by other methods.
     */
    methods?: {
        [x: string]: (component: Component, target: HTMLElement, event: any) => void;
    };
    /**
     * The watched state and props callbacks, those methods are called when a state or prop is set.
     */
    watch?: Watcher;
    /**
     * Method called once the this.component is connected to the DOM.
     */
    connected?: (component: Component) => void;
    /**
     * Method called once the this.component is disconnected from the DOM.
     */
    disconnected?: (component: Component) => void;
    /**
     * The root of the this.component (shadowRoot or element).
     */
    root?: HTMLElement | ShadowRoot;
};
export type DefineOptions = {
    extends?: string;
};
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
declare function define(component: Component, options?: DefineOptions): string;
