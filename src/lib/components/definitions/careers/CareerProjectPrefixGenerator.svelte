<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
  import CareerProjectPrefixGeneratorCover from '$lib/assets/CareerProjectPrefixGenerator-cover.png';
</script>

<CareerItem
  id='career-project-prefix-gen'
  title={m.career_title_project_prefix_generator()}
  startsAt={{ year: 2020, month: 5 }}
>
  {m.career_details_project_prefix_generator()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_project_prefix_generator_title()}
    subtitle="{m.html()}, {m.css()}, {m.javascript()}"
  >
    <div class="content">
      <p><ExternalLink href="https://name.ho9.me">{m.extlink_site_name_prefix_gen()}</ExternalLink></p>
    </div>
    <div class="content">
      <p>
        <img src={CareerProjectPrefixGeneratorCover} alt=""/><br />
      </p>
    </div>
    <div class="content">
      <p>{m.career_contents_project_prefix_generator_body_1()}</p>
      <p>{m.career_contents_project_prefix_generator_body_2()}</p>
      <p><br /></p>
      <p>{m.career_contents_project_prefix_generator_body_3()}</p>
      <p><br /></p>
      <p>{m.see_more()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2020-05-14-reviewing-prefix-generator/">{m.extlink_post_title_reviewing_prefix_generator()}</ExternalLink></p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
