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

<section class="profile" style:margin-top={preset.profileVerticalSpacing.marginTop} style:margin-bottom={preset.profileVerticalSpacing.marginBottom} style:padding-top={preset.profileVerticalSpacing.paddingTop} style:padding-bottom={preset.profileVerticalSpacing.paddingBottom}>
  {#if !preset.disableIntroductionDiv}
    <Introduction disableSummary={preset.disableIntroductionSummaryDiv} disableDescription={preset.disableIntroductionDescriptionDiv} disableEmbed={preset.disableIntroductionEmbedDiv} enableScrollAdjustment={preset.enableIntroductionScrollAdjustment} descriptionMarginTop={preset.introductionDescriptionMarginTop} shownParagraphs={preset.shownIntroductionParagraphs} recentPostsCount={preset.countRecentPostsEmbed} hideEmailLink={preset.hideProfileEmailLink} hideGithubLink={preset.hideProfileGithubLink} hideBlogLink={preset.hideProfileBlogLink} hideInstagramLink={preset.hideProfileInstagramLink} verticalSpacing={preset.introductionVerticalSpacing} />
  {/if}
</section>
