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
    <style>
      #gist-masters-see-more ul {
        list-style: disc;
        padding-left: 1em;
      }
      #gist-masters-see-more li {
        margin: .25em 0;
      }
    </style>
    <div id="gist-masters-see-more" class="content">
      <p>{m.career_contents_algorithm_contest_gist_body_1()}</p>
      <p>{m.career_contents_algorithm_contest_gist_body_2()}</p>
      <span>문제 일람</span>
      <ul>
        <li><ExternalLink href='https://archive.is/TaEdZ'>{m.career_contents_algorithm_contest_gist_prob_a()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/VfYfn'>{m.career_contents_algorithm_contest_gist_prob_b()} ({m.set_problem()})</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/WiDf4'>{m.career_contents_algorithm_contest_gist_prob_c()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/YnXhs'>{m.career_contents_algorithm_contest_gist_prob_d()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/0thiQ'>{m.career_contents_algorithm_contest_gist_prob_e()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/DXVVz'>{m.career_contents_algorithm_contest_gist_prob_f()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/gpVxB'>{m.career_contents_algorithm_contest_gist_prob_g()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/wmzMm'>{m.career_contents_algorithm_contest_gist_prob_h()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/2fSfS'>{m.career_contents_algorithm_contest_gist_prob_i()}</ExternalLink></li>
      </ul>
      <p><br /></p>
      <p>
        <ExternalLink href='https://m.etnews.com/20240719000005'>
          {m.see_more()}: {m.etnews()}
        </ExternalLink>
        <ExternalLink href='https://www.acmicpc.net/category/detail/4225'>
          {m.contest_page()}
        </ExternalLink>
        <ExternalLink href='https://archive.is/suENW'>
          (archive.is)
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
