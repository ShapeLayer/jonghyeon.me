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
        <p><i>미래에셋박현주재단 해외교환 장학생 33기 지원서에서 발췌:</i></p>
        <div class="appliance-body">
          <p>저는 게임 개발자가 되어 콘솔 발매 타이틀 제작에 참여하고 싶습니다. 특히 PC보다 낮은 하드웨어 성능을 가진 콘솔 기기에, 어떻게 PC에서도 버벅이는 게임들을 끊김 문제 없이 원활하게 동작하게 하는지 기술적인 부분에서 관심이 많습니다. 구체적으로, 요 수 주 간에는 커트 건서로스의 &lt;Optimized C++&gt;라는 책을 새로이 공부하고 있습니다.</p>
          <p>하지만 일반에게 공개된 내용을 학습하는 것에는 다소 한계가 있습니다. 기기 성능과 최적화 문제에서 상대적으로 자유로운 PC 게임들을 주로 제작하는 우리나라의 게임 스튜디오에서 일하는 것으로는 충분하지 않습니다. 그래서 콘솔 타이틀 제작 스튜디오가 많은 일본으로의 취업을 진지하게 고려하고 있습니다. 궁금증을 해소하려면 닌텐도, 소니(플레이스테이션)의 게임 스튜디오나 이러한 콘솔 게임기에 계속해서 게임 타이틀을 발매하는 게임 스튜디오에서 일하는 것이 최적입니다.</p>
          <p>하지만 일본 현지에서 일할 수 있는 수준의 일본어 능력이 갖춰지지 않았습니다. 지난 겨울 방학 중에 일본어만 사용하여 대화를 이어 나가는 회화 수업에 참여하고 나서, 일본어로 전공 용어를 이야기에 사용하는 것 이전에 생활 일본어도 능숙하게 꺼내지 못하고 있다는 것을 깨달았습니다.</p>
          <p>그래서 현지에서 수개월간 생활하며 일본어를 사용해야만 하는 환경에 저 자신을 노출시키기 위해, 오는 가을학기에 일본으로 교환학생으로서 해외 파견을 나가게 되었습니다.</p>
        </div>
        
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
