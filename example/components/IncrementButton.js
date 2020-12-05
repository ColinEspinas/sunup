import { define, emit } from '../../src/sunup.js';

export default define({
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
		increment({ state }, target) { target.innerHTML = `Counting: ${++state.count}`; },
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color({ props }) { console.log('color is now ' + props.color) }
		}
	}
});