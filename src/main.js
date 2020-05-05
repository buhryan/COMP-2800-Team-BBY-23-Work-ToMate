import App from './home.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Team 23'
	}
});
const app2 = new App({
	target:document.body,
	prosp: {
		name: 'Team 23'
	}
});

export default app;
