

const useState = ({ state, persist, component } = {}) => {
	state = state || {};

	// Setting defaults from storage if persisted, if not from props
	if (persist && JSON.parse(localStorage.getItem(persist + '-state'))) {
		state = JSON.parse(localStorage.getItem(persist + '-state')) || state;
		if (component) {
			for (const [name, data] of Object.entries(state))
				if (component.props[name]) component.props[name] = { force: true, value: data };
		}
	}
	else {
		if (component) {
			for (let [name, data] of Object.entries(state))
				state[name] = component.props[name] ? component.props[name] : data;
		}
	}

	return new Proxy(state, {
		set(state, key, value) {
			state[key] = value;
			if (persist && typeof persist === 'string')
				localStorage.setItem(persist + '-state', JSON.stringify(state));
			if (component && component.watch && component.watch.state && component.watch.state[key])
				component.watch.state[key].call(null, component);
			if (component) {
				for (const prop of Object.keys(component.props)) {
					if (prop === key)
						component.customElement.setAttribute(':' + prop, value);
				}
			}
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