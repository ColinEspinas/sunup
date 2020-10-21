import { define, emit } from '../../src/sunup.js';

const App = {
	selector: 'sunup-app',
    extends: null,
	template: ({props, data}) => /*html*/`
		<h1 id="title" @update="updateTitle">${data.title}</h1>
		<button @click="increment">Counting: ${props.count}</button>
	`,
	style: /*css*/`
		h1 {
			color: red;
		}
	`,
	props: {
		count: 0,
	},
	data: {
		title: "Hello, world!",
	},
	methods: {
		increment(event) {
			this.props.count++;
			emit(this, '#title', 'update');
		},
		updateTitle(event) {
			console.log(event);
			this.root.querySelector("#title").innerHTML = this.props.count;
		}
	}
}

export default define(App);