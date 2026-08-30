<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='edu-bachelor-unlv-short-term'
  title={m.career_title_edu_bachelor_unlv_short_term_study()}
>
  <ul>
    <li>{m.career_details_edu_bachelor_unlv_short_term_study_li_0()}</li>
    <li>{m.career_details_edu_bachelor_unlv_short_term_study_li_1()}</li>
    <li><ExternalLink href='https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=49&bbsMode=view&page=54&key=15924'>{m.chonnam_national_university_press_release()}</ExternalLink></li>
  </ul>
</CareerItem>
