import { define, emit } from '../../src/sunup.js';

export default define({
	selector: 'increment-button',
	extends: HTMLButtonElement,
	noShadow: true,
	template: ({ props }) => /*html*/`
		<root class="button" @click="increment">
			<span>Counting: ${props.count}</span>
		</root>
	`,
	style: ({ props }) => /*css*/`
		span { 
			color: ${props.color}; 
		}
	`,
	props: {
		count: { default: 10 },
		color: { default: 'green' },
	},
	state: {
		count: null,
	},
	methods: {
		increment({ state }, target) { target.textContent = `Counting: ${++state.count}`; },
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color({ props }) { console.log('color is now ' + props.color) }
		}
	},
	persist: "increment"
}, {extends: 'button'});