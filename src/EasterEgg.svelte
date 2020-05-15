<script>
  import { spring } from "svelte/motion";
  import { fade } from "svelte/transition";

  let coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.05,
      damping: 0.14
    }
  );

  let size = spring(10);
  let visible = true;

  setTimeout(() => {
    visible = false;
  }, 5000);
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  circle {
    fill: pink;
  }
  .container {
    height: 100%;
    width: 100%;
    position: relative;
  }
  img {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<body>
  <div class="container">
    <div>
      <audio src="KirbyDance.mp3" autoplay />
      <a href="/add-List">
        <button id="back">Back</button>
      </a>
    </div>
    {#if !visible}
    <label transition:fade={{ delay: 250, duration: 500 }}>
      <input type="checkbox" bind:checked={visible} />
      Make Kirby come back.
    </label>
          {/if}
    {#if visible}
      <img
        transition:fade={{ delay: 250, duration: 500 }}
        src="https://media.tenor.com/images/5875a102ce91c83e4f857c31e790b180/tenor.gif"
        alt="kirbyDance" />
    {/if}
    <svg
      on:mousemove={e => coords.set({ x: e.clientX, y: e.clientY })}
      on:mousedown={() => size.set(70)}
      on:mouseup={() => size.set(30)}>
      <circle cx={$coords.x} cy={$coords.y} r={$size} />
    </svg>
  </div>
</body>
