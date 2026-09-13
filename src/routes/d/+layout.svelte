<script lang="ts">
  let { children } = $props();
</script>

<main class="detail-page">
  {@render children()}
</main>

<style>
  .detail-page {
    min-height: 100vh;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 3em 2em;
    box-sizing: border-box;
    background: white;
  }

  .detail-page :global(code) {
    padding: 0.12em 0.35em;
    border-radius: 0.25em;
    color: #a33a3a;
    background-color: rgba(190, 55, 55, 0.09);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 0.9em;
    line-height: inherit;
    overflow-wrap: anywhere;
  }

  @media (max-width: 800px) {
    .detail-page {
      padding: 2em 1.5em;
    }
  }
</style>
