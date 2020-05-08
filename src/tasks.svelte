<script>
	import {db} from "./firebase.js"
	let tasks = [];
	db.collection("Users").doc("username").collection("Task-Lists").doc(localStorage.getItem('listName')).collection('Tasks').onSnapshot(snapshot => {
		tasks = snapshot.docs;
	})
	console.log(localStorage.getItem('listName'));
	function storeID(){
		localStorage.setItem('taskName', this.id);
		localStorage.setItem('progress', this.data().progress);
		localStorage.setItem('desc', this.data().desc);
		localStorage.setItem('complete', this.data().complete);
	}
	console
</script>

<h1>Tasks</h1>
	{#each tasks as job}
		<div id="list">
		<a href="/task-Details"><button on:click={storeID} id="{job.data().task}"><span>{job.data().task}</span><br></button></a>
		</div>
    {/each}
<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align:center;
	}
	span{
		vertical-align:middle;
		font-size:30px;
		text-align:left;
	}

</style>