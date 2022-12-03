<script lang="ts" context="module">
  export const starts = '2022-07-04'
  export const ends = '2024-01-03'
  
  const CONF_INTERVAL_FOLDED: number = 1000 * 60
  const CONF_INTERVAL_UNFOLDED: number = 30
  const CONF_INTERVAL_INIT = CONF_INTERVAL_FOLDED
  const CONF_DISPLAY_POINT_FOLDED: number = 2
  const CONF_DISPLAY_POINT_UNFOLDED: number = 12
  const CONF_DISPLAY_POINT_INIT = CONF_DISPLAY_POINT_FOLDED
</script>

<span id="military-left-service-duration">
  { leftDates }일 남음, 
  <span
    id="percentage-displayer"
    on:mouseover={onMouseOverHandler}
    on:mouseout={onMouseOutHandler}
    on:focus={onMouseOverHandler}
    on:blur={onMouseOutHandler}
  >{ leftPercentage }%
  </span>
</span>

<script lang="ts">
  import { onMount } from 'svelte'

  // Init Lefts Calcuator
  let nowDate: number = new Date().getTime()
  const startsDate: number = new Date(starts).getTime()
  const endsDate: number = new Date(ends).getTime()
  const totalLefts: number = endsDate - startsDate
  $: nowLefts = (endsDate - nowDate) as number
  $: leftDates = Math.ceil(nowLefts / (1000 * 60 * 60 * 24)) as number
  $: leftPercentage = Math.max((1 - nowLefts / totalLefts) * 100, 0).toFixed(displayPoint)
  // Init Percentage Displayer
  let displayUpdater: any
  let loopInterval: number = CONF_INTERVAL_INIT
  let displayPoint: number = CONF_DISPLAY_POINT_INIT

  // Defines Common Functions
  const invokeCalcLefts = () => {
    /*
      nowLefts, leftDates, leftPercentage is reactive variable.
      (autmoatically calculated)
    */
    nowDate = new Date().getTime()
  }

  // Defines Percentage Displayer Functions
  const __invokeUpdater = (fn: Function, ms: number) => {
    clearInterval(displayUpdater)
    displayUpdater = setInterval(fn, ms)
  }
  const __procPercentage = () => { invokeCalcLefts() }
  const __procFoldingPercentage = () => {
    if (displayPoint == CONF_DISPLAY_POINT_FOLDED) __postProcFoldingPercentage()
    else {
      displayPoint--
      __procPercentage()
    }
  }
  const __procUnfoldingPercentage = () => {
    if (displayPoint == CONF_DISPLAY_POINT_UNFOLDED) __postProcUnfoldingPercentage()
    else {
      displayPoint++
      __procPercentage()
    }
  }
  const __postProcFoldingPercentage = () => {
    loopInterval = CONF_INTERVAL_FOLDED
    __invokeUpdater(__procPercentage, loopInterval)
  }
  const __postProcUnfoldingPercentage = () => {
    loopInterval = CONF_INTERVAL_UNFOLDED
    __invokeUpdater(__procPercentage, loopInterval)
  }
  const invokeFoldPercentage = () => { 
    loopInterval = CONF_INTERVAL_UNFOLDED
    __invokeUpdater(__procFoldingPercentage, loopInterval)
  }
  const invokeUnfoldPercentage = () => {
    loopInterval = CONF_INTERVAL_UNFOLDED
    __invokeUpdater(__procUnfoldingPercentage, loopInterval)
  }
  const onMouseOverHandler = invokeUnfoldPercentage
  const onMouseOutHandler = invokeFoldPercentage
  // Init Process
  const init = () => {
    invokeCalcLefts()
  }
  onMount(init)
</script>