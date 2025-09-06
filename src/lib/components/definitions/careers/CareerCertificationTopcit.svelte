<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import TopcitGradeGraph from '$lib/components/TopcitGradeGraph.svelte';
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
            <th>{m.career_contents_certification_topcit_table_header_0()}</th>
            <th>{m.career_contents_certification_topcit_table_header_1()}</th>
            <th>{m.career_contents_certification_topcit_table_header_2()}</th>
            <th>{m.career_contents_certification_topcit_table_header_3()}</th>
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
    <div id="topcit-score-dist">
      <!--
      <TopcitGradeGraph
        renderSize={{ width: 1500, height: 600 }}
        screenSize={{ width: 500, height: 200 }}
        padding={{ top: 20, right: 20, bottom: 20, left: 50 }}
        scores={{
          sigma: 100,
          mean: 352.5,
          myScore: 747,
          top30: 575.3,
          top10: 675.1,
          targetPeakHeightPercentage: 0.12
        }}
        graphRange={{
          xMin: 150,
          xMax: 850,
          yMin: 0,
          yMax: 0.25
        }}
      />-->
    </div>
    <div id="topcit-description">
      <p>{m.career_contents_certification_topcit_body_1a()}</p>
      <p>{m.career_contents_certification_topcit_body_1b()}</p>
      <p><br /></p>
      <p>{m.career_contents_certification_topcit_body_2()}</p>
      <ul>
        <li>
          {m.career_contents_certification_topcit_li_1a()}<br />
          {m.career_contents_certification_topcit_li_1b()}
        </li>
        <li>
          {m.career_contents_certification_topcit_li_2a()}<br />
          {m.career_contents_certification_topcit_li_2b()}
        </li>
        <li>
          {m.career_contents_certification_topcit_li_3a()}<br />
          {m.career_contents_certification_topcit_li_3b()}
        </li>
        <li>
          {m.career_contents_certification_topcit_li_4a()}<br />
          {m.career_contents_certification_topcit_li_4b()}
        </li>
        <li>
          {m.career_contents_certification_topcit_li_5a()}<br />
          {m.career_contents_certification_topcit_li_5b()}
        </li>
      </ul>
      <p><br /></p>
      <p style="text-align: right; text-decoration: italic;">source:
        <ExternalLink href='https://www.topcit.or.kr/introduction/topcit.do'>
          {m.extlink_site_name_topcit()}
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
