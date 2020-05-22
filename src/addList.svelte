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
  const MAX_CLICKS = 5;

  let listName = {
    name: "Default List",
    editing: false
  };
  let currentFilter = "all";
  let newTask = "";
  let tempId = 1;
  let logoCount = 0;
  let tasks = [];
  let inputText = "+ New Task";
  let userid = firebase.auth().currentUser.uid;

  // Allows for editing for the list name.
  const editListName = () => {
    listName.editing = true;
    listName = listName;
  };

  // Finishes editing the list name and changes it.
  const doneEditListName = () => {
    listName.editing = false;
    listName = listName;
  };

  // doneEditListName is run when the enter key is pressed also.
  const doneEditKeydownListName = e => {
    if (event.which === ENTER_KEY) {
      doneEditListName(listName);
    }
  };
  
  // Adds a task to an array when the enter key is pressed.
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

  // Adds a task to an array when you click off the input.
  const addTaskBlur = () => {
    // If the input is empty, nothing is added, input goes back to default.
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

  // Removes the placeholder text on the input.
  const removePlaceholder = () => {
    inputText = "";
  };

  // Replaces the text with the default placeholder text.
  const replaceText = () => {
    inputText = "+ new task";
  };

  // Allows for editing of task names.
  const editTask = task => {
    task.editing = true;
    tasks = tasks;
  };
  
  // Finishes editing task names and saves the changed values.
  const doneEdit = task => {
    task.editing = false;
    tasks = tasks;
  };

  // Runs doneEdit when the enter key is pressed.
  const doneEditKeydown = (task, e) => {
    if (event.which === ENTER_KEY) {
      doneEdit(task);
    }
  };

  // Deletes the task from the array and the list.
  const deleteTask = id => {
    tasks = tasks.filter(task => task.id !== id);
  };

  // Checks all the tasks on the list, unchecks all if they're all checked.
  const checkAllTasks = e => {
    tasks.forEach(task => (task.checked = event.target.checked));
    tasks = tasks;
  };

  // Deletes the checked tasks on the list from the array.
  const clearChecked = () => {
    tasks = tasks.filter(task => !task.checked);
  };

  // Changes the filter to display the selected tasks.
  const updateFilter = filter => {
    currentFilter = filter;
  };

  // Saves the list and all the tasks to the database.
  const saveList = () => {
    let listId;
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .add({
        listName: listName.name
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
          db.collection("users")
            .doc(userid)
            .collection("Task-Lists")
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

  // Triggers the easter egg when there have been 5 clicks on the logo.
  const logoClick = () => {
    logoCount++;
    if (logoCount === MAX_CLICKS) {
      document.getElementById("logoLink").href = "/EasterEgg";
    }
    console.log(logoCount);
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

    <a href="/task-Lists">
      <button id="back">Back</button>
    </a>

    <a id="logoLink">
      <img
        src={'favicon.png'}
        alt="worktomate logo"
        class="logo"
        id="logo"
        on:click={logoClick} />
    </a>

    {#if !listName.editing}
      <h1 class="list-name" on:dblclick={() => editListName(listName)}>
        {listName.name}
      </h1>
    {:else}
      <input
        class="list-name-edit"
        bind:value={listName.name}
        type="text"
        on:blur={doneEditListName}
        on:keydown={doneEditKeydownListName} />
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
      <a href="/task-Lists">
        <button on:click={saveList}>Save List</button>
      </a>
    </div>

  </div>
</main>
