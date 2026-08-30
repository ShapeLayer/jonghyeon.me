<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='work-jamcoding-lecturer'
  title={m.career_title_work_jamcoding_lecturer()}
>
  <ul>
    <li>{m.career_details_work_jamcoding_lecturer_li_0()}</li>
    <li>{m.career_details_work_jamcoding_lecturer_li_1()}</li>
    <li>{m.career_details_work_jamcoding_lecturer_li_2()}</li>
  </ul>
</CareerItem>
