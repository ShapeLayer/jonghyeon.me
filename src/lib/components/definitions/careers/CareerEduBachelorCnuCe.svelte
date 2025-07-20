<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='edu-bachelor-chonnam-natl-univ-ce'
  title={m.career_title_edu_bachelor_cnu_ce()}
  startsAt={{ year: 2021, month: 3 }}
  current={true}
/>
