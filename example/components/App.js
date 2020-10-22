import { define, emit } from '../../src/sunup.js';
import IncrementButton from './IncrementButton.js';

const App = {
	selector: 'sunup-app',
	template: ({state}) => /*html*/`
		<h1 id="title">${state.title}</h1>
		<increment-button @click='increment' :count=10></increment-button>
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
		increment(target) {
			emit(target.component, 'update');
		}
	}
}

export default define(App);