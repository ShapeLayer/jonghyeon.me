<script lang="ts" context="module">
  let status: number = 0 // 0: offline, 1: online, 2: busy
  const statusToClassTable: Array<string> = ['is-offline', 'is-online', 'is-busy']
  let statusSummary: string = '오프라인, 일과 중'
  const kstOffset = 9 * 60 * 60 * 1000
  let kstNow: Date
  let isDayoff: boolean = false
</script>

<span id="daily-status" class="is-offline">
  <span class="status-dot"></span> { statusSummary }
</span>

<script lang="ts">
  import { onMount } from 'svelte';

  let getKST = (datetime: Date) => {
    let dt = new Date(datetime)
    let dtUTC = dt.getTime() + (dt.getTimezoneOffset() * 60 * 1000)
    let dtKST = new Date(dtUTC + kstOffset)
    return dtKST
  }
  let updateNow = () => {
    kstNow = getKST(new Date())
  }
  let updateStatusSummary = () => {
    let hours: number = kstNow.getHours()
    let mins: number = kstNow.getMinutes()
    if (isDayoff) {
      if (hours < 8 || (hours == 8 && mins < 30)) {
        status = 0
        statusSummary = '오프라인, 취침'
      } else if (hours < 19) {
        status = 1
        statusSummary = '온라인, 개인 정비'
      } else if (hours < 20) {
        status = 2
        statusSummary = '바쁨, 운동 중'
      } else if (hours < 22) {
        status = 2
        statusSummary = '바쁨, 일과 중'
      } else {
        let tomorrow: Date = getKST(new Date(kstNow.getFullYear(), kstNow.getMonth(), kstNow.getDate() + 1))
        if (getDateIsDayOff(tomorrow)) {
          status = 1
          statusSummary = '온라인, 연등 중'
        } else {
          status = 0
          statusSummary = '오프라인, 취침'
        }
      }
    } else {
      // TODO: make
    }
  }
  let updateStatusDot = () => {
    let el = document.getElementById('daily-status')
    for (let i: number = 0; i < 3; i++) {
      let statusString = statusToClassTable[i]
      if (i == status) {
        el.classList.add(statusString)
      } else {
        if (el.classList.contains(statusString)) {
          el.classList.remove(statusString)
        }
      }
    }
  }
  let getDateIsDayOff = (dt: Date) => {
    let isDayoff = false
    switch (dt.getDay()) {
      case 0:
      case 6:
        isDayoff = true
        break
    }
    return isDayoff
  }
  let updateStatus = () => {
    updateNow()
    isDayoff = getDateIsDayOff(kstNow)
    updateStatusSummary()
    updateStatusDot()
  }

  onMount(() => {
    updateStatus()
    setInterval(() => {
      updateStatus()
    }, 1000)
  })
</script>

<style lang="scss">
#daily-status {
  display: inline-block;
  .status-dot {
    display: inline-block;
    margin: 0 .15em 0 .25em;
    width: .7em;
    height: .7em;
    background-color: black;
    vertical-align: baseline;
    border-radius: 50%;
  }
  .is-online { background-color: #56f000; }
  .is-busy { background-color: #ffb302; }
  .is-offline { background-color: #ff3838; }
}
</style>