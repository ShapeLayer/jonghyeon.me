<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='activity-gwangju-sw-festival19'
  title={m.career_title_activity_gwangju_sw_festival19()}
  startsAt={{ year: 2019, month: 5 }}
>
  {m.career_details_activity_gwangju_sw_festival19()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title='2019광주SW체험축전 참여'
      subtitle='<한글코드로 만드는 디스코드 챗봇> 체험 프로그램 운영'
    >
      <div>
        <p>
          2019년 광주광역시에서 열린 &lt;2019광주SW체험축전&gt;에서 &lt;한글코드로 만드는 디스코드 챗봇&gt; 체험 프로그램을 기획하고, 소프트웨어를 개발하여, 운영하였습니다.<br />
          체험자는 한국어로 정의된 프로그램 스크립트를 사용해 디스코드 챗봇을 만들 수 있었습니다.
        </p>
        <p>
          이 체험은 일반인이 간단한 스크립팅을 하지 못하는 이유를 "프로그래밍 언어가 모국어가 아니기 때문"으로 가정하고 기획하였습니다.<br />
          주최 관계자들에게 참신성 면에서 호평을 받았으나, 체험 프로그램을 운영하면서 위 가정이 틀렸음을 확인할 수 있었습니다.
        </p>
        <p>자세히 알아보기: <ExternalLink href="https://blog.jonghyeon.me/posts/2019-05-28-reviewing-gwangju-sw-festival/">&lt;2019 광주SW체험축전을 되돌아보며&gt;</ExternalLink></p>
      </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
