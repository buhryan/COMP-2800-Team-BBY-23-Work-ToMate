<script>
  import { Route } from "tinro";
  import {active} from 'tinro';
  import TaskLists from "./task-Lists.svelte";
  import Tasks from "./tasks.svelte";
  import TaskDetails from "./task-details.svelte";
  import AddList from "./addList.svelte";
  import Home from "./home.svelte";
  import AboutUs from "./aboutUs.svelte";
</script>

<style>
  a {
    margin-right: 5%;
  }
</style>

<nav>
  <a href="/home">Home</a>
  <a href="/timer">Start a Timer</a>
  <a href="/task-Lists">Task Lists</a>
  <a href="/team">Team</a>
  <a href="/friends">Friends</a>
  <a href="/about-Us">About us</a>
</nav>

<Route path="/">
  <h1>Landing Page</h1>
</Route>
<Route path="/home">
  <Home />
  <h1>Homepage</h1>
</Route>
<Route path="/task-Lists">
  <TaskLists />
</Route>
<Route path="/tasks">
  <Tasks />
</Route>
<Route path="/task-Details">
  <TaskDetails />
</Route>
<Route path="/add-List">
  <AddList />
</Route>
<Route path="/about-Us">
<AboutUs/>
</Route>
