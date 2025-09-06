<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
  import CareerAlgorithmContestGistCover from '$lib/assets/CareerAlgorithmContestGist-cover.webp';
</script>

<CareerItem
  id='algorithm-contest-gist'
  title={m.career_title_algorithm_contest_gist()}
  startsAt={{ year: 2024, month: 5 }}
>
  {m.career_details_algorithm_contest_gist()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_gist_title()}
    subtitle={m.career_contents_algorithm_contest_gist_subtitle()}
  >
    <style>
      .career-algorithm-contest-gist-cover img {
        max-width: 100%;
        height: auto;
      }
    </style>
    <div class="career-algorithm-contest-gist-cover">
      <p>
        <img src={CareerAlgorithmContestGistCover} alt="" /><br />
        Source: <ExternalLink href='https://m.etnews.com/20240719000005'>{m.etnews()}</ExternalLink>
      </p>
    </div>
    <div class="content">
      <p>{m.career_contents_algorithm_contest_gist_body_1()}</p>
      <p>{m.career_contents_algorithm_contest_gist_body_2()}</p>
      <p><br /></p>
      <p>{m.see_more()}: <ExternalLink href='https://m.etnews.com/20240719000005'>{m.etnews()}</ExternalLink></p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
