import { define, emit } from '../../src/sunup.js';

const IncrementButton = {
	selector: 'increment-button',
	template: ({ props }) => /*html*/`
		<button @click="increment">Counting: ${props.count}</button>
	`,
	style: ({ props }) => /*css*/`
		span { 
			color: ${props.color}; 
		}
	`,
	props: {
		count: { default: 0 },
		color: { default: 'green' },
	},
	state: {
		count: null,
	},
	methods: {
		increment(target) { target.innerHTML = `Counting: ${++this.state.count}`; },
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color() { console.log('color is now ' + this.props.color) }
		}
	}
}

export default define(IncrementButton);