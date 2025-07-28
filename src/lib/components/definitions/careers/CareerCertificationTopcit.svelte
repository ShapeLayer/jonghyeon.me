<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='certification-topcit'
  title={m.career_title_certification_topcit()}
  startsAt={{ year: 2025, month: 5, day: 24 }}
>
  {#snippet detailContent()}
  <CareerItemDetailContent
    title='TOPCIT'
    subtitle='Scored 747, Level 4'
  >
    <style>
      .topcit-table-wrapper {
        display: flex;
        justify-content: center;
        margin: 1em 0;
      }
      #topcit-description ul { list-style-type: disc; padding-left: 1em; }
      #topcit-description li { margin: .5em 0; }
    </style>
    <div class="topcit-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>점수/만점</th>
            <th>전체 평균</th>
            <th>상위 30%</th>
            <th>상위 10%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>747/1000</td>
            <td>352.5/1000</td>
            <td>575.3/1000</td>
            <td>675.1/1000</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="topcit-description">
      <p>TOPCIT(Test Of Practical Competency in IT)은 정보통신기획평가원에서 주관하는 소프트웨어 역량 검정입니다.</p>
      <p>기술 영역(소프트웨어, 데이터, 시스템 아키텍처, 정보보안), 비즈니스 영역(IT비즈니스와 윤리, TC와 PM), 통합 영역(통합 역량)에 걸쳐 ICT 분야에서 요구되는 창의적 문제 해결력, 실무 능력 중심으로 평가합니다.</p>
      <p><br /></p>
      <p>역량수준 점수기준(1000점 만점)</p>
      <ul>
        <li>
          수준 1: 입문형 (0 ~ 149점)<br />
          기술 및 비즈니스 영역 관련 지식 및 스킬에 대한 이해가 미흡한 수준
        </li>
        <li>
          수준 2: 도전형 (150 ~ 399점)<br />
          기술 및 비즈니스 영역에 대한 지식과 스킬을 이해하는 수준
        </li>
        <li>
          수준 3: 능숙형 (400 ~ 649점)<br />
          기술 및 비즈니스 영역에 대한 지식과 스킬을 적용하여 과제를 해결할 수 있는 수준
        </li>
        <li>
          수준 4: 문제해결형 (650 ~ 849점)<br />
          기술 및 비즈니스 영역에 대한 지식과 스킬을 응용하여 과제를 해결할 수 있는 수준
        </li>
        <li>
          수준 5: 창의융합형 (850 ~ 1,000점)<br />
          기술 및 비즈니스 영역에 대한 지식과 스킬을 응용하여 주도적으로 과제를 해결할 수 있는 수준
        </li>
      </ul>
      <p><br /></p>
      <p style="text-align: right; text-decoration: italic;">source:
        <ExternalLink href='https://www.topcit.or.kr/introduction/topcit.do'>
          TOPCIT
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
