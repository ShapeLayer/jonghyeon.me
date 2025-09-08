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
    <div style="content">
      <p>전남대학교 입학과 함께 전남대학교 공과대학 전자컴퓨터공학부 소속의 게임개발동아리, PIMM에 가입하여 활동했습니다.</p>
      <p>전역 직후의 2024년에는 동아리의 회장을 맡아 1년간 동아리를 운영하였습니다. 회장을 맡은 1년간, 신규 가입한 이래 계속해서 동아리에서 확인했던 문제점들을 수정해내고자 노력했습니다.</p>
    </div>
    <div id="pimm-see-more" class="content">
      {m.see_more()}
      <ul>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-08-28-has-onboarding-study-been-succeed/">&lt;동아리 신규 회원을 대상으로 한 온보딩 스터디는 성공했는가&gt;</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-08-28-why-i-applied-agreement-about-religion/">&lt;왜 그리고 어떻게 나는 동아리에 "종교에 관한 서약서"를 도입하였는가&gt;</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-11-14-granting-legal-personality-to-undergraduate-club/">&lt;동아리에 법인격 부여하기&gt;</ExternalLink></li>
        <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-11-29-i-worked-in-undergraduate-club/">&lt;게임개발동아리를 1년간 운영하다&gt;</ExternalLink></li>
      </ul>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
