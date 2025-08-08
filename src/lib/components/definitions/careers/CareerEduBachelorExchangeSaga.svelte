<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='edu-bachelor-exchange-sage'
  title={m.career_title_edu_bachelor_exchange_sage()}
  startsAt={{ year: 2025, month: 9 }}
  endsAt={{ year: 2026, month: 2 }}
>
  {m.career_details_edu_bachelor_exchange_sage()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title='해외파견 교환학생'
      subtitle='Saga University, Saga, Japan'
    >
      <style>
        #saga-univ-map iframe {
          width: 100%;
          max-width: 100%;
          height: 300px;
          border: 0;
        }
      </style>
      <div id="saga-univ-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.966410718565!2d130.28798687618553!3d33.24118337347303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541ca8ba597dd67%3A0x77632573b355ab93!2z7IKs6rCAIOuMgO2VmQ!5e0!3m2!1sko!2skr!4v1754630922005!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div id="saga-univ-content">
        <p>25년 가을학기, 일본 사가현 사가시의 사가대학으로 해외파견 교환학생을 떠납니다.</p>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
