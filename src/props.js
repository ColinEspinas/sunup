

const useProps = ({props, component} = {}) => {
	props = props || {};
	return new Proxy(props, {
		set(props, key, modifier) {
			if (modifier.force) {
				props[key].value = modifier.value;
				if (component && component.watch && component.watch.props && component.watch.props[key])
					component.watch.props[key].call(null, component);
				if (props[key].state) {
					component.state[props[key].state] = props[key].value;
				}
				for (const stateName of Object.keys(component.state)) {
					if (stateName === key)
						component.state[stateName] = props[key].value;
				}
			}
			else
				console.error('You cannot set a property manually, store your data in the component state or pass them through a parent component (dom attribute)');
			return true;
		},
		get(props, key) {
			return props[key].value;
		},
	});
}

export default useProps;