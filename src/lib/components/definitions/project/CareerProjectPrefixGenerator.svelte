<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id="career-project-prefix-gen" title={m.career_title_project_prefix_generator()}>
  <ul>
		<li><ExternalLink href="https://name.ho9.me">{m.extlink_site_name_prefix_gen()}</ExternalLink></li>
    <li>{m.career_details_project_prefix_generator()}</li>
    <li><ExternalLink
        href="https://blog.jonghyeon.me/posts/2020-05-14-reviewing-prefix-generator/"
        >{m.extlink_post_title_reviewing_prefix_generator()}</ExternalLink
      >
    </li>
  </ul>
</CareerItem>
