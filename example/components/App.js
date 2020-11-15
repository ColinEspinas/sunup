import { define, emit } from '../../src/sunup.js';
import IncrementButton from './IncrementButton.js';

const App = {
	selector: 'sunup-app',
	template: ({ state }) => /*html*/`
		<h1 id="title" @click="setTitle" @counter-updated="changeColor">${state.title}</h1>
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
		setTitle() {
			this.state.title = 'Hello, Mills!';
		},
		changeColor(target) {
			target.style.color = 'blue';
		}
	},
	watch: {
		state: {
			/** @this App */
			title() { 
				this.root.querySelector("#title").innerHTML = this.state.title;
			}
		}
	}
}

export default define(App);