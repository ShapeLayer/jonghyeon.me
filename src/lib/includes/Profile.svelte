<script lang="ts">
  import Introduction from '$lib/components/Introduction.svelte';
  import type { Preset } from '$lib/models/presets';

  let { preset }: { preset: Preset } = $props();
</script>

<style>
  .profile {
    display: block;
  }
</style>

<section class="profile">
  {#if !preset.disableIntroductionDiv}
    <Introduction disableSummary={preset.disableIntroductionSummaryDiv} disableDescription={preset.disableIntroductionDescriptionDiv} disableEmbed={preset.disableIntroductionEmbedDiv} recentPostsCount={preset.countRecentPostsEmbed} />
  {/if}
</section>
