<script>
	import {db} from "./firebase.js"
	let taskDetails = [];
	db.collection("Users").doc("username").collection("Task-Lists").doc(localStorage.getItem('listName')).collection('Tasks').doc(localStorage.getItem('taskName')).onSnapshot(snapshot => {
		taskDetails = snapshot.docs;
	})
</script>

<h1>{localStorage.getItem('taskName')}</h1>
<h1>{localStorage.getItem('desc')}</h1>
<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align:center;
	}
</style>