import { define, emit } from '../../src/sunup.js';
import ShadowElement from './ShadowElement.js';
import style from '../style.css.js';

export default define({
	selector: 'increment-button',
	extends: HTMLButtonElement,
	noShadow: true,
	template: (self) => /*html*/`
		<root class="button" @click="increment">
			<span class="counter" @color="changeColor" style="color: ${self.props.color}">Counting: ${self.props.count}</span>
		</root>
	`,
	style,
	props: {
		count: { default: 10 },
		color: { default: 'red' },
		test: { default: [] },
	},
	state: {
		count: null,
	},
	methods: {
		increment({ state }, target) { target.querySelector('.counter').textContent = `Counting: ${++state.count}`; },
		changeColor({ props }, target) { console.log('color2'); target.style.color = props.color; },
		log({ props }) { console.log(props.test); }
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color(component) { emit('color', { component }); console.log('color')},
			test({ props }) { console.log(props.test); }
		}
	},
	connected: (component) => {
		console.log(component);
	},
	// persist: "increment"
}, {extends: 'button'});