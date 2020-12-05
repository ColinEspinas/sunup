import { define, emit } from '../../src/sunup.js';
import IncrementButton from './IncrementButton.js';

export default define({
	selector: 'sunup-app',
	template: ({ state }) => /*html*/`
		<h1 id="title" @click="setTitle">${state.title}</h1>
		<increment-button :count=10 :color="red"></increment-button>
	`,
	style: () => /*css*/`
		h1 {
			color: red;
		}
	`,
	state: {
		title: "Hello, world!",
	},
	methods: {
		setTitle({ state }) { state.title = 'Hello, Mills!';	},
	},
	watch: {
		state: {
			title({root, state}) { 
				root.querySelector("#title").innerHTML = state.title;
			}
		}
	}
});