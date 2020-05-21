<!-- 
  Found on Github
  By drehimself
  This code was  adapted from code found here: 
  source: https://github.com/drehimself/svelte-todo-examplef
-->
<script>
  import { fly } from "svelte/transition";
  import { db } from "./firebase.js";

  const ENTER_KEY = 13;
  let groupName = {
    name: "Group Name",
    editing: false
  };
  let currentFilter = "all";
  let newTask = "";
  let tempId = 1;
  let logoCount = 0;
  let tasks = [];
  let inputText = "+ New Task";
  let userid = firebase.auth().currentUser.uid;
  let memberArray = [];
  // Edits the group name.
  const editGroupName = () => {
    groupName.editing = true;
    groupName = groupName;
  };
  // Run this when finished editing the group name.
  const doneEditGroupName = () => {
    groupName.editing = false;
    groupName = groupName;
  };
  // Run doneEditGroupName when hitting enter.
  const doneEditKeydownGroupName = e => {
    if (event.which === ENTER_KEY) {
      doneEditGroupName(groupName);
    }
  };
  // Adds a task to groups task list.
  // can't accept empty names
  const addTask = e => {
    if (e.which === ENTER_KEY) {
      tasks.push({
        id: tempId,
        checked: false,
        title: newTask,
        editing: false
      });
      tasks = tasks;
      tempId++;
      newTask = "";
    }
  };
  // Adds task to database when clicked off of.
  const addTaskBlur = () => {
    if (newTask !== "") {
      tasks.push({
        id: tempId,
        checked: false,
        title: newTask,
        editing: false
      });
      tasks = tasks;
      tempId++;
      newTask = "";
      inputText = "+ new task";
    } else {
      replaceText();
    }
  };
  // Removes placeholder text.
  const removePlaceholder = () => {
    inputText = "";
  };
  // Replaces text in textbox.
  const replaceText = () => {
    inputText = "+ new task";
  };
  // Edits a task name.
  const editTask = task => {
    task.editing = true;
    tasks = tasks;
  };
  // When finished editing task name run this.
  // can't accept empty names
  const doneEdit = task => {
    task.editing = false;
    tasks = tasks;
  };
  // When enter is hit run doneEdit.
  const doneEditKeydown = (task, e) => {
    if (event.which === ENTER_KEY) {
      doneEdit(task);
    }
  };
  // Deletes task.
  const deleteTask = id => {
    tasks = tasks.filter(task => task.id !== id);
  };
  // Checks a task.
  const checkAllTasks = e => {
    tasks.forEach(task => (task.checked = event.target.checked));
    tasks = tasks;
  };
  // Clears all checked tasks.
  const clearChecked = () => {
    tasks = tasks.filter(task => !task.checked);
  };
  // Upates the Filter.
  const updateFilter = filter => {
    currentFilter = filter;
  };
  // Creates a new team in database.
  const createTeam = () => {
    let listId;
    memberArray.push(userid);
    db.collection("groups")
      .add({
        grpName: groupName.name,
        members: memberArray
      })
      .then(function(docRef) {
        listId = docRef.id;
        console.log("Document written with ID: ", listId);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
      .then(() => {
        tasks.forEach(task => {
          db.collection("groups")
            .doc(listId)
            .collection("Tasks")
            .add({
              task: task.title,
              desc: "none",
              complete: false
            })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        });
      });
  };

  $: taskNum = tasks.filter(task => !task.checked).length;
  $: filteredTasks =
    currentFilter === "all"
      ? tasks
      : currentFilter === "checked"
      ? tasks.filter(task => task.checked)
      : tasks.filter(task => !task.checked);
</script>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .logo {
    display: block;
    margin: 20px auto;
  }
  .input-container {
    position: sticky;
    position: -webkit-sticky;
    bottom: 80px;
  }
  .task-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 24px;
    margin-bottom: 16px;
    border: none;
  }
  input[type="checkbox"] {
    -webkit-transform: scale(2);
    transform: scale(2);
    padding: 10px;
  }
  .task-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    font-size: 24px;
  }
  .remove-item:hover {
    color: grey;
  }
  .task-item-left {
    display: flex;
    align-items: center;
  }
  .task-item-label {
    font-size: 24px;
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
    margin-bottom: 12px;
    overflow-wrap: break-word;
  }
  .task-item-edit,
  .list-name-edit {
    font-size: 24px;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: Helvetica, Arial, sans-serif;
  }
  .task-item-edit:focus {
    outline: none;
  }
  .checked {
    text-decoration: line-through;
    color: grey;
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 14px 0px;
    margin-bottom: 10px;
    background: white;
    position: sticky;
    position: -webkit-sticky;
    bottom: 0;
  }
  .button-container input {
    margin-right: 16px;
  }
  button {
    font-size: 18px;
    background-color: white;
    border-radius: 5px;
    appearance: none;
  }
  button:hover {
    background: #ee8152;
    color: white;
  }
  button:focus {
    outline: none;
  }
  @media screen and (max-width: 400px) {
    .logo {
      width: 250px;
      height: 250px;
    }
    button {
      padding: 12px;
      font-size: 20px;
    }
  }
</style>

<main>

  <div class="container">

    <a href="/team">
      <button id="back">Back</button>
    </a>

    <a id="logoLink">
      <img src={'favicon.png'} alt="worktomate logo" class="logo" id="logo" />
    </a>

    {#if !groupName.editing}
      <h1 class="list-name" on:dblclick={() => editGroupName(groupName)}>
        {groupName.name}
      </h1>
    {:else}
      <input
        class="list-name-edit"
        bind:value={groupName.name}
        type="text"
        on:blur={doneEditGroupName}
        on:keydown={doneEditKeydownGroupName} />
    {/if}

    {#each filteredTasks as task}
      <div class="task-item">
        <div class="task-item-left" transition:fly={{ y: 20, duration: 300 }}>
          <input
            class="task-checkbox"
            type="checkbox"
            bind:checked={task.checked} />
          {#if !task.editing}
            <div
              class="task-item-label"
              class:checked={task.checked}
              on:dblclick={() => editTask(task)}>
              {task.title}
            </div>
          {:else}
            <input
              class="task-item-edit"
              bind:value={task.title}
              type="text"
              on:blur={() => doneEdit(task)}
              on:keydown={() => doneEditKeydown(task)} />
          {/if}
        </div>
        <div class="remove-item" on:click={() => deleteTask(task.id)}>
          &times;
        </div>
      </div>
    {/each}

    <div class="input-container">
      <input
        type="text"
        class="task-input"
        placeholder={inputText}
        on:focus={removePlaceholder}
        on:blur={addTaskBlur}
        bind:value={newTask}
        on:keydown={addTask} />
    </div>

    <div class="button-container">
      <div>
        <label>
          <input type="checkbox" on:change={checkAllTasks} />
          Check All
        </label>
      </div>
      <div>{taskNum} tasks</div>
    </div>

    <div>
      <button on:click={clearChecked}>Clear Checked Tasks</button>
    </div>

    <div>
      <a href="/team">
        <button on:click={createTeam}>Create Team</button>
      </a>
    </div>

  </div>
</main>
