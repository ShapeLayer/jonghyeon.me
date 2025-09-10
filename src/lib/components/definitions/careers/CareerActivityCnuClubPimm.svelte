<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='activity-cnu-club-pimm'
  title={m.career_title_activity_cnu_club_pimm()}
  startsAt={{ year: 2021, month: 3 }}
  current={true}
>
  {m.career_details_activity_cnu_club_pimm_lead()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title="전남대학교 게임개발동아리 PIMM"
  >
    <style>
      #pimm-see-more ul {
        list-style: disc;
        padding-left: 1em;
      }
      #pimm-see-more li {
        margin: .25em 0;
      }
    </style>
    <div class="content">
      <ExternalLink href="https://github.com/pimm-dev">{m.extlink_site_pimm_github()}</ExternalLink>
    </div>
    <div class="content">
      <p>{m.career_contents_activity_cnu_club_pimm_body_1a()}</p>
      <p>{m.career_contents_activity_cnu_club_pimm_body_1b()}</p>
    </div>
    <div id="pimm-see-more" class="content">
      {m.see_more()}
      <ul>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-08-28-has-onboarding-study-been-succeed/">{m.extlink_post_title_has_onboarding_study_been_succeed()}</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-08-28-why-i-applied-agreement-about-religion/">{m.extlink_post_title_why_i_applied_agreement_about_religion()}</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-11-14-granting-legal-personality-to-undergraduate-club/">{m.extlink_post_title_granting_legal_personality_to_undergraduate_club()}</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-11-29-i-worked-in-undergraduate-club/">{m.extlink_post_title_i_worked_in_undergraduate_club()}</ExternalLink></li>
      </ul>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
