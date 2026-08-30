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
>
  <ul>
    <li><ExternalLink href='https://foundation.miraeasset.com/ko/news/press/view.do?listCnt=6&pageIndex=1&detailsKey=188&tq=&q='>{m.mirae_asset_foundation_press_release()}</ExternalLink> <ExternalLink href='https://www.broof.io/search/8babbd71'>{m.scholarship_certificate()}<sup>broof.io</sup></ExternalLink></li>
  </ul>
</CareerItem>
