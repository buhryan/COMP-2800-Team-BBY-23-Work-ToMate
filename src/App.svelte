<script>
    import {Route} from 'tinro'; 
	import TaskLists from './task-Lists.svelte';
	import Tasks from './tasks.svelte';
	import TaskDetails from './task-details.svelte';
</script>

<nav>
    <!-- <a href="/">Home</a> -->
    <a href="/timer">Start a Timer</a>
    <a href="/task-Lists">Task Lists</a>
	<a href="/tasks">Team</a>
	<a href="/friends">Friends</a>
</nav>

<Route path="/"><h1>It is main page</h1></Route>
<Route path="/task-Lists"><TaskLists /></Route>
<Route path="/tasks"><Tasks/></Route>
<Route path="/task-Details"><TaskDetails/></Route>