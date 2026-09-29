<script lang="ts">
  import Catchphrase from '$lib/components/Catchphrase.svelte';
  import type { VerticalSpacing } from '$lib/models/presets';

  let { verticalSpacing = {} }: { verticalSpacing?: VerticalSpacing } = $props();
</script>

<div class="hero" style:margin-top={verticalSpacing.marginTop} style:margin-bottom={verticalSpacing.marginBottom} style:padding-top={verticalSpacing.paddingTop} style:padding-bottom={verticalSpacing.paddingBottom}>
  <Catchphrase />
</div>
