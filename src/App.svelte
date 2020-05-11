<script>
  import { Route } from "tinro";
  import { active } from "tinro";
  import TaskLists from "./task-Lists.svelte";
  import Tasks from "./tasks.svelte";
  import TaskDetails from "./task-details.svelte";
  import AddList from "./addList.svelte";
  import Home from "./home.svelte";
  import AboutUs from "./aboutUs.svelte";
  import Landing from "./landing.svelte";
  import Timer from "./timer.svelte";
  import Team from "./team.svelte";
  import Friends from "./friends.svelte";
  import Signup from "./signup.svelte";
  import Login from "./login.svelte";
</script>

<Route path="/" redirect="/landing" />
<Route path="/signup">
    <Signup/>
</Route>
<Route path="/login">
  <Login/>
</Route>
<Route path="/home">
  <Home />
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
  <AboutUs />
</Route>
<Route path="/landing">
  <Landing />
</Route>
<Route path="/timer">
  <Timer />
</Route>
<Route path="/friends">
  <Friends />
</Route>
<Route path="/team">
  <Team />
</Route>
