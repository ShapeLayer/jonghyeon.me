<script lang="ts">
  export let type: string;
</script>

<div class="{'highlighter__'+type}">
  <slot />
</div>

<style lang="scss">
  div {
    display: inline-block;
    color: #F0F0F0;
    background-color: #4E4B42;
  }
  .highlighter__inline {
    padding: .6em .9em;
  }
  .highlighter__title {
    padding: .05em 0.15em;
  }
</style>