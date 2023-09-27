<script lang="ts" context="module">
  export const starts = '2022-07-04'
  export const ends = '2024-01-03'
  const ranks = ['이병', '일병', '상병', '병장']
</script>

<span id="military-rank">
  { nowRank }
</span>

<script lang="ts">
  import { onMount } from 'svelte'
  let nowRank: string
  const startsDate: number = new Date(starts).getTime()
  const nowDate: number = new Date().getTime()
  const elapsedMonths: number = new Date(nowDate - startsDate).getMonth()
  const updateRank = () => {
    if (elapsedMonths < 3) nowRank = ranks[0]
    else if (elapsedMonths < 9) nowRank = ranks[1]
    else if (elapsedMonths < 15) nowRank = ranks[2]
    else nowRank = ranks[3]
    nowRank = '병장'
  }
  const init = updateRank
  onMount(init)
</script>
