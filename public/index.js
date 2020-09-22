import use from '../src/use.js';

(async () => {
	await use('../public/components/test.js', { tag: 'test-component' });
})();