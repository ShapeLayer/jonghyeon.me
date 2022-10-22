<script lang="ts">
  import CareersSectionContent from './CareersSectionContent.svelte'
  export let id: string
	export let title: string = ''
</script>

<div id={id ? id : null} class="careers__sections">
	{#if title !== ''}
		<h3 class="subtitle">{ title }</h3>	
	{/if}
	<ul>
		<slot></slot>
	</ul>
</div>

<style lang="scss">
div.careers__sections {
  margin: 0 1em;
  margin-bottom: 2em;
  h3.subtitle {
    margin-bottom: .5em;
  }
}
</style>