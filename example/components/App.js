import { define, emit } from '../../src/sunup.js';
import IncrementButton from './IncrementButton.js';

export default define({
	selector: 'sunup-app',
	template: ({ state }) => /*html*/`
		<root class="test">
			<h1 id="title" @click="setTitle">${state.title}</h1>
			<button is="increment-button" id="1" :color="blue"></button>
			<button is="increment-button" id="2" :color="red"></button>
		</root>
	`,
	style: () => /*css*/`
		h1 {
			color: red;
		}
	`,
	state: {
		title: "Hello, World!",
		name: "You",
	},
	methods: {
		setTitle({ state }) { state.title = `Hello, ${ state.name }!`; },
	},
	watch: {
		state: {
			title({ root, state }) { 
				root.querySelector("#title").textContent = state.title;
			},
		}
	}
});