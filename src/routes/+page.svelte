<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Hero from '$lib/includes/Hero.svelte';
  import Profile from '$lib/includes/Profile.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import Careers from '$lib/includes/Careers.svelte';
  import Footer from '$lib/includes/Footer.svelte';
  import { defaultPreset, resolvePreset } from '$lib/models/presets';

  let preset = $state(defaultPreset);

  afterNavigate(() => {
    preset = resolvePreset(new URLSearchParams(window.location.search).get('preset'));
  });
</script>

{#if !preset.disableHeroSection}
  <Hero verticalSpacing={preset.heroVerticalSpacing} />
{/if}
{#if !preset.disableProfileSection}
  <Profile {preset} />
  {#if !preset.hideProfileCareersHr}
    <SectionDivider margin={preset.profileCareersHrMargin} />
  {/if}
{/if}
{#if !preset.disableCareersSection}
  <Careers opened={preset.openCareersSectionTabOpened} hiddenOverrides={preset.careerItemHiddenOverrides} tagDisplayModes={preset.careerTagDisplayModes} detailTagVisibility={preset.careerDetailTagVisibility} popupTransitionDurationMs={preset.popupTransitionDurationMs} verticalSpacing={preset.careersVerticalSpacing} />
  {#if !preset.hideCareersFooterHr}
    <SectionDivider margin={preset.careersFooterHrMargin} />
  {/if}
{/if}
<Footer verticalSpacing={preset.footerVerticalSpacing} hideBadges={preset.hideFooterBadges} hideLocaleSelector={preset.hideFooterLocaleSelector} hideCopyright={preset.hideFooterCopyright} />
