

const useState = ({state, persist, component} = {}) => {
	state = state || {};
	return new Proxy(state, {
		set(state, key, value) {
			state[key] = value;
			if (persist && typeof persist === 'string')
				localStorage.setItem(persist + '-state', JSON.stringify(state));
			if (component && component.watch && component.watch.state && component.watch.state[key])
				component.watch.state[key].call(component);
			return true;
		},
		get(state, key) {
			if (persist && typeof persist === 'string')
				state = JSON.parse(localStorage.getItem(persist + '-state')) || state;
			return state[key];
		},
	});
}

export default useState;