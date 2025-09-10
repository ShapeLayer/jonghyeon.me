<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerProjectZodiacComplexCover from '$lib/assets/CareerProjectZodiacComplex-cover.webp';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='project-zodiac-complex'
  title={m.career_title_project_zodiac_complex()}
  startsAt={{ year: 2025, month: 7 }}
  endsAt={{ year: 2025, month: 8 }}
>
  {m.career_details_project_zodiac_complex()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_title_project_zodiac_complex()}
      subtitle='Unity, C#, Naninovel'
    >
      <div class="content" id="career-project-zodiac-complex-cover">
        <p>
          <img src={CareerProjectZodiacComplexCover} alt=""/><br />
        </p>
      </div>
      <div class="content" id="zodiac-complex">
        <p>{m.career_contents_project_zodiac_complex_body_1()}</p>
        <p>{m.career_contents_project_zodiac_complex_body_2()}</p>
      </div>
      <div class="content">
        {m.see_more()}: <ExternalLink href='https://store.onstove.com/ko/games/102108'>{m.stove_store()}</ExternalLink>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
