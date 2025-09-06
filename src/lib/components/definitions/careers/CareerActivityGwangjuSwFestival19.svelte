<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerActivityGwangjuSwFestival19Cover from '$lib/assets/CareerActivityGwangjuSwFestival19-cover.webp';
</script>

<CareerItem
  id='activity-gwangju-sw-festival19'
  title={m.career_title_activity_gwangju_sw_festival19()}
  startsAt={{ year: 2019, month: 5 }}
>
  {m.career_details_activity_gwangju_sw_festival19()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_contents_activity_gwangju_sw_festival19_title()}
      subtitle={m.career_contents_activity_gwangju_sw_festival19_subtitle()}
    >
      <style>
        .career-activity-gwangju-sw-festival19-cover {
          display: flex;
          justify-content: center;
          margin: 1em 0;
        }
        .career-activity-gwangju-sw-festival19-cover img {
          max-width: 100%;
          height: auto;
        }
      </style>
      <div class="career-activity-gwangju-sw-festival19-cover">
        <img src={CareerActivityGwangjuSwFestival19Cover} alt=""/>
      </div>
      <div>
        <p>
          {m.career_contents_activity_gwangju_sw_festival19_body_1a()}<br />
          {m.career_contents_activity_gwangju_sw_festival19_body_1b()}
        </p>
        <p>
          {m.career_contents_activity_gwangju_sw_festival19_body_2a()}<br />
          {m.career_contents_activity_gwangju_sw_festival19_body_2b()}
        </p>
        <p>{m.see_more()}: <ExternalLink href='https://blog.jonghyeon.me/posts/2019-05-28-reviewing-gwangju-sw-festival/'>{m.extlink_post_title_reviewing_gwangju_sw_festival()}</ExternalLink></p>
      </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
