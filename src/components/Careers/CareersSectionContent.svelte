<script lang="ts">
  export let name: string = ''
  export let date: string = ''
  export let url: string = ''
</script>

<li>
  {#if url !== ''}
    <a href={ url } target="_blank" rel="noreferrer">{ name }</a>
  {:else}
    {name}
  {/if}
  <span class="datetime">{ date }</span>
  {#if name !== ''}
    <br>
  {/if}
  <slot></slot>
</li>

<style lang="scss">
  li {
    margin-bottom: .5em;
    span.datetime {
      margin-left: .2em;
      font-size: .8em;
      color: var(--base-fg-color-brighter);
      font-style: italic;
    }
  }
</style>