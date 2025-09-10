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
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_contents_edu_bachelor_exchange_saga_title()}
      subtitle={m.career_contents_edu_bachelor_exchange_saga_subtitle()}
    >
      <style>
        #saga-univ-map iframe {
          width: 100%;
          max-width: 100%;
          height: 300px;
          border: 0;
        }
        #saga-univ-content {
          margin-top: 2em;
        }
        #saga-univ-content .appliance-body {
          padding: 1em;
          background-color: rgba(255, 100, 0, 0.05);
          font-family: "Gowun Dodum", serif;
          font-weight: 400;
          font-style: normal;
          font-size: .9em;
        }
      </style>
      <div class="content" id="saga-univ-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.966410718565!2d130.28798687618553!3d33.24118337347303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541ca8ba597dd67%3A0x77632573b355ab93!2z7IKs6rCAIOuMgO2VmQ!5e0!3m2!1sko!2skr!4v1754630922005!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="content" id="saga-univ-content">
        <p><i>{m.career_contents_edu_bachelor_exchange_saga_body_1()}</i></p>
        <div class="appliance-body">
          <p>{m.career_contents_edu_bachelor_exchange_saga_body_2a()}</p>
          <p>{m.career_contents_edu_bachelor_exchange_saga_body_2b()}</p>
          <p>{m.career_contents_edu_bachelor_exchange_saga_body_2c()}</p>
          <p>{m.career_contents_edu_bachelor_exchange_saga_body_2d()}</p>
        </div>
        
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
