import { define, emit } from '../../src/sunup.js';

const IncrementButton = {
	selector: 'increment-button',
	template: ({ props }) => /*html*/`
		<button @click="increment">Counting: <span @update="updateCounter">${props.count}</span></button>
	`,
	style: ({ props }) => /*css*/`
		span { 
			color: ${props.color}; 
		}
	`,
	props: {
		count: { default: 0, state: 'count'},
	},
	state: {
		count: null,
	},
	methods: {
		increment() { ++this.state.count; },
		updateCounter(target) { target.innerHTML = this.state.count; }
	},
	watch: {
		state: {
			count() { emit('update'); }
		}
	}
}

export default define(IncrementButton);