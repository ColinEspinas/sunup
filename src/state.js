

const useState = ({state, persist, component} = {}) => {
	state = state || {};
	return new Proxy(state, {
		set: function(state, key, value) {
			state[key] = value;
			if (component && component.watch && component.watch.state && component.watch.state[key])
				component.watch.state[key].call(component);
			if (persist && typeof persist === 'string')
				localStorage.setItem(persist + '-state', state);
			return true;
		}
	});
}

export default useState;