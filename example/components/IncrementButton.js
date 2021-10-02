import { define, emit } from '../../src/sunup.js';
import style from '../style.css.js';

export default define({
	selector: 'increment-button',
	extends: HTMLButtonElement,
	noShadow: true,
	template: (self) => /*html*/`
		<root class="button" @click="increment">
			<span 
				class="counter"
				style="color: ${self.props.color}"
				@color="changeColor"
			>
				Counting: ${self.props.count}
			</span>
		</root>
	`,
	style,
	props: {
		count: { default: 10 },
		color: { default: 'red' },
	},
	state: {
		count: null,
	},
	methods: {
		increment({ state }, target) { target.querySelector('.counter').textContent = `Counting: ${++state.count}`; },
		changeColor({ props }, target) { target.style.color = props.color; },
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color(component) { emit('color', { component }); },
		}
	},
	connected: (component) => {
		console.log("Mounted!", component);
	},
}, {extends: 'button'});