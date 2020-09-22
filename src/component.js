export default async () => {

	class Component extends HTMLElement {

		constructor() {
			super();
			this.attachShadow({mode: 'open'});
			this.content = document.createElement('div');
			this.content.className = "component-wrapper";
			this.shadowRoot.appendChild(this.content);
		}

		connectedCallback() { this.connected(); }
		connected() {}

		static define(tag, constructor) {
			customElements.define(tag, constructor);
		}

		static tag(meta) {
			return new URL(meta.url).searchParams.get('tag');
		}

		setStyle(style) {
			const styleElement = document.createElement('style');
			styleElement.innerHTML = style;
			this.content.appendChild(styleElement);
		}
	}

	customElements.define('sunup-std-component', Component);

	return Component;
};