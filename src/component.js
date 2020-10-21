// OLD FILE WILL BE REMOVED IN THE NEAR FUTURE

// export default async () => {

//   class Component extends HTMLElement {

//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//     }

//     // Alias Example
//     connectedCallback() { this.connected(); }
//     connected() { }

//     /**
//      * Get Tag from import url
//      * @param {string} url 
//      */
//     static tag(url) {
//       const importUrl = new URL(url);
//       if (!importUrl.searchParams.get('tag')) {
//         return importUrl.pathname.match(/\/([a-z, \-]+)\.[a-z]{0,9}$/)[1];
//       }
//       return importUrl.searchParams.get('tag');
//     }

//     set css(style) {
//       let styleElement = document.createElement('style');
//       styleElement.innerHTML = style;
//       const currentStyleElement = this.shadowRoot.querySelector('style');
//       if (currentStyleElement) this.shadowRoot.replaceChild(styleElement, currentStyleElement);
//       else this.shadowRoot.prepend(styleElement);
//     }

//     set htm(markup) {
//       let template = document.createElement('template');
//       template.innerHTML = markup;
//       const style = this.shadowRoot.querySelector('style') || document.createElement('style');
//       this.shadowRoot.innerHTML = '';
//       this.shadowRoot.appendChild(style);
//       this.shadowRoot.appendChild(template.content);
//     }
//   }

//   customElements.define('sunup-std-component', Component);

//   return Component;
// };