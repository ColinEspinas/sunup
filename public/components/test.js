import use from "../../src/use.js";

export default async () => {

	const Component = await use('../../src/component.js');
	const css = await use('../../public/css/style.css');

	class Test extends Component {

		connected() {
			console.log("Connected !");

			this.setStyle(css);

			this.heading = document.createElement('h1');
			this.heading.innerText = "Hello World!";
			this.content.appendChild(this.heading);
		}

	}

	Component.define(Component.tag(import.meta), Test);

	return Test;
};