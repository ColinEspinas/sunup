

const useProps = ({props, component} = {}) => {
	props = props || {};
	return new Proxy(props, {
		set() {
			console.error('You cannot set a property manually, store your data in the component state or pass them through a parent component');
			return true;
		},
		get(props, key) {
			return props[key].value;
		},
	});
}

export default useProps;