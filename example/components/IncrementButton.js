import { define, emit } from '../../src/sunup.js';

const IncrementButton = {
	selector: 'increment-button',
	template: ({ props, state }) => /*html*/`
		<button @click="increment">Counting: <span @update="updateCounter">${state.count}</span></button>
	`,
	style: ({ props }) => /*css*/`
		span { 
			color: ${props.color}; 
		}
	`,
	state: {
		count: 0,
	},
	methods: {
		increment() { ++this.state.count; },
		updateCounter(target) { target.innerHTML = this.state.count; }
	},
	watch: {
		state: {
			count() { emit(this, 'update'); }
		}
	}
}

export default define(IncrementButton);