<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='edu-bachelor-unlv-short-term'
  title={m.career_title_edu_bachelor_unlv_short_term_study()}
  startsAt={{ year: 2024, month: 8 }}
>
  {#snippet detailContent()}
    <CareerItemDetailContent
      title='UNLV 단기 파견 프로그램'
      subtitle='Energy Workshop'
    >
      <style>
        #unlv-map iframe {
          width: 100%;
          max-width: 100%;
          height: 300px;
          border: 0;
        }
      </style>
      <div id="unlv-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.4250840121917!2d-115.14610012399666!3d36.10750030644007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c501997ee05f%3A0xe38117c11c6f42c6!2z64Sk67CU64ukLCDrnbzsiqTrsqDsnbTqsbDsiqQg64yA7ZWZ!5e0!3m2!1sko!2skr!4v1753806617603!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div id="unlv-content">
        <p>네바다대학교, 라스베이거스(UNLV)의 단기 연수 프로그램에 전남대학교 SW중심대학사업단 선발 학생으로 참여하여, 신재생에너지 발전과 발전에 사용되는 각종 기계장치의 제어, 운영과 데이터수집에 대해 배웠습니다.</p>
        <p>다양한 발전시설과 연구센터를 견학하였고, 특히 네바다 주의 사막 지역에서 태양광, 태양열 발전 기계장치의 제어와 데이터 수집 방법에 대해 배울 수 있었습니다.</p>
        <p><br /></p>
        <p>더 알아보기: <ExternalLink href='https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=49&bbsMode=view&page=54&key=15924'>전남대학교 보도자료</ExternalLink></p>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
