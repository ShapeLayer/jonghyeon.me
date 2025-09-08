<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='proejct-sign-language-client'
  title={m.career_title_project_sign_language_client()}
  startsAt={{ year: 2021, month: 6 }}
  endsAt={{ year: 2022, month: 7 }}
>
  {m.career_details_project_sign_language_client()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title="청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 애플리케이션 클라이언트"
    subtitle="Unity, C#"
  >
    <div class="content">
      <p>한국어 문장을 수어로 번역하고, 번역한 수어를 캐릭터를 사용하여 재생하는 소프트웨어 솔루션의 클라이언트 파트 개발에 참여하였습니다.</p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
