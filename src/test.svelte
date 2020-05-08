<script>
export let name;
let tasks =["Buy Milk", "Do Homework", "Code"];
</script>
<main id="main">
	<h1>Hello {name}!</h1>
	<a href="test.html">test</a>
	{#each tasks as task, count}
	<div id="list">
	<input type="checkbox"><span>{task}</span><br>
	</div>
	{/each}
</main>