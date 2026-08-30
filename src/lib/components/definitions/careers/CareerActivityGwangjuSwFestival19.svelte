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
>
  <ul>
    <li>{m.career_contents_activity_gwangju_sw_festival19_body_1a()}</li>
    <li>{m.career_contents_activity_gwangju_sw_festival19_body_1b()}</li>
    <li><ExternalLink href='https://blog.jonghyeon.me/posts/2019-05-28-reviewing-gwangju-sw-festival/'>{m.extlink_post_title_reviewing_gwangju_sw_festival()}</ExternalLink></li>
  </ul>
</CareerItem>
