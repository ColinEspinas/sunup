import { define, emit } from '../../src/sunup.js';

export default define({
	selector: 'increment-button',
	extends: HTMLButtonElement,
	noShadow: true,
	template: ({ props }) => /*html*/`
		<root class="button" @click="log">
			<span id="counter-text" @color="changeColor">Counting: ${props.count}</span>
		</root>
	`,
	style: ({ props }) => /*css*/`
	`,
	props: {
		count: { default: 10 },
		color: { default: 'green' },
		test: { default: [] },
	},
	state: {
		count: null,
	},
	methods: {
		increment({ state }, target) { target.querySelector('#counter-text').textContent = `Counting: ${++state.count}`; },
		changeColor({ props }, target) { target.style.color = props.color; },
		log({ props }) { console.log(props.test); }
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color(component) { emit('color', { component }); },
			test({ props }) { console.log(props.test); }
		}
	},
	connected: (component) => {
		console.log(component.props);
	},
	persist: "increment"
}, {extends: 'button'});