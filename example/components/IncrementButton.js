import { define, emit } from '../../src/sunup.js';

const IncrementButton = {
	selector: 'increment-button',
	template: ({props}) => /*html*/`
		<button>Counting: <span @update="updateCounter">${props.count}</span></button>
	`,
	style: /*css*/`
		h1 {
			color: red;
		}
	`,
	props: {
		count: 0,
	},
	methods: {
    increment() {
			emit(this, 'update');
		},
		updateCounter(target) {
			target.innerHTML = ++this.props.count;
		}
	}
}

export default define(IncrementButton);