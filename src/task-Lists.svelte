<script>
	import {db} from "./firebase.js"
	let taskList = [];
	db.collection("Users").doc("username").collection("Task-Lists").onSnapshot(snapshot => {
		taskList = snapshot.docs;
    })
    function storeID(){
        localStorage.setItem('listName', this.id);
    }
</script>

<h1>Task Lists</h1>
	{#each taskList as list}
		<div id="list">
		<a href="/tasks"><button on:click={storeID} id="{list.data().listName}"><span>{list.data().listName}</span><br></button></a>
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