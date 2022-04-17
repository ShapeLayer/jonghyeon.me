<script lang="ts">
	import Header from './includes/profile/Header.svelte';
	import Descriptions from './includes/profile/Descriptions.svelte';
	import Footer from './includes/profile/Footer.svelte';
</script>

<main>
	<Header />
	<Descriptions />
	<Footer />
</main>

<style lang="scss">
	main {
		margin: auto;
		max-width: 1024px;
	}
</style>