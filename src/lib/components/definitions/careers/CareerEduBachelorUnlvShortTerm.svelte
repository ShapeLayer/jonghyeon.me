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
      title={m.career_contents_edu_bachelor_unlv_short_term_study_title()}
      subtitle={m.career_contents_edu_bachelor_unlv_short_term_study_subtitle()}
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
        <p>{m.career_contents_edu_bachelor_unlv_short_term_study_body_1()}</p>
        <p>{m.career_contents_edu_bachelor_unlv_short_term_study_body_2()}</p>
        <p><br /></p>
        <p>{m.see_more()}: <ExternalLink href='https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=49&bbsMode=view&page=54&key=15924'>{m.chonnam_national_university_press_release()}</ExternalLink></p>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
