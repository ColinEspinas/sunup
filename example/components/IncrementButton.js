import { define, emit } from '../../src/sunup.js';

const IncrementButton = {
	selector: 'increment-button',
	template: ({props}) => /*html*/`
		<button>Counting: <span @update="updateCounter">${props.count}</span></button>
	`,
	style: ({props}) => /*css*/`
		span { 
			color: ${props.color}; 
		}
	`,
	props: {
		count: 0,
		color: 'red',
	},
	methods: {
		updateCounter(target) {
			target.innerHTML = ++this.props.count;
		}
	}
}

export default define(IncrementButton);