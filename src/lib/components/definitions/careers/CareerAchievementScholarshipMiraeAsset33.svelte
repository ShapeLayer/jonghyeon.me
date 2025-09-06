<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerAchievementScholarshipMiraeAsset33Cover from '$lib/assets/CareerAchievementScholarshipMiraeAsset33-cover.jpg';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='achievement-mirae-asset-33'
  title={m.career_title_achievement_scholarship_mirae_asset_33th()}
  startsAt={{ year: 2025, month: 7 }}
  endsAt={{ year: 2026, month: 2 }}
>
  {#snippet detailContent()}
    <CareerItemDetailContent
      title='미래에셋박현주재단 해외교환 장학생 33기'
    >
      <style>
        #career-achievement-mirae-asset-33-cover {
          display: flex;
          justify-content: center;
          margin: 1em 0;
        }
        #career-achievement-mirae-asset-33-cover img {
          max-width: 100%;
          height: auto;
        }
      </style>
      <div id="career-achievement-mirae-asset-33-cover">
        <p>
          <img src="https://foundation.miraeasset.com/upload/editor/20250707044544003771.png" alt=""/><br />
          Source: <ExternalLink href='https://foundation.miraeasset.com/ko/news/press/view.do?listCnt=6&pageIndex=1&detailsKey=188&tq=&q='>미래에셋박현주재단 보도자료</ExternalLink>
        </p>
      </div>
      <div class="content">
        더 알아보기: <ExternalLink href='https://foundation.miraeasset.com/ko/news/press/view.do?listCnt=6&pageIndex=1&detailsKey=188&tq=&q='>미래에셋박현주재단 보도자료</ExternalLink> <ExternalLink href='https://www.broof.io/search/8babbd71'>장학증서<sup>broof.io</sup></ExternalLink>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
