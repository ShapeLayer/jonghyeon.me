<script lang="ts" context="module">
  const enlist = new Date('2022-07-04')
  const discharge = new Date('2024-01-03')

  export function getRemains (fn: () => string) {
    let now = new Date()
    let totalRemains = discharge - enlist
    let nowRemains = discharge - now
    let remainsDay = Math.floor(nowRemains / (1000*60*60*24))
    let percentage = Math.max((1 - nowRemains / totalRemains) * 100, 0).toFixed(2)
    return `${percentage}%, 전역까지 ${remainsDay}일`
  }
</script>

<span id="military-dday">nn%, 전역까지 dd일</span>

<script lang="ts">
  import { onMount } from 'svelte';

  function updateInformation () {
    const el = document.getElementById('military-dday')
    el.innerText = getRemains()
    setInterval(() => {
      el.innerText = getRemains()
    }, 10000)
  }
  
  onMount(() => updateInformation())
</script>