<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id="works-typst-maintaining" title={m.career_title_works_typst_maintaining()}>
	<ul>
		<li>ucpc-solutions: 
			<ExternalLink href="https://typst.app/universe/package/ucpc-solutions">
				Typst Universe
			</ExternalLink>
		</li>
		<li>
		  furiruby: 
			<ExternalLink href="https://typst.app/universe/package/furiruby">
			  Typst Universe
			</ExternalLink>
		</li>
	</ul>
</CareerItem>
