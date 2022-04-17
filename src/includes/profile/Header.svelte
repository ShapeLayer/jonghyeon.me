<script lang="ts">
  import Highlighter from '../../components/profile/Highlighter.svelte';
  import { getEnterMil, getExitMil } from '../../components/commons/DDay.svelte';
  import '../../scss/text.scss';

  let milEnterDDay, milExitDDay: number, number;

  $: milEnterDDay = Math.floor(getEnterMil().getTime()/(1000*60*60*24));
  $: milExitDDay = Math.floor(getExitMil().getTime()/(1000*60*60*24));

  let headerMottoSwitch = 0;
  setInterval(() => {
    headerMottoSwitch = (headerMottoSwitch + 1) % 2;
    document.querySelector('#headerRoot__layer-shape').style.opacity = 1 - headerMottoSwitch;
    document.querySelector('#headerRoot__shape-layer').style.opacity = headerMottoSwitch;
  }, 15000);
</script>

<headerRoot>
  <div class="headerRoot__wrapper">
    <h1><Highlighter type="inline">Park, "ShapeLayer" Jonghyeon</Highlighter></h1>
    <div class="headerRoot__h2-wrapper">
      <h2 id="headerRoot__layer-shape">Creates a world<br>
        by <Highlighter type="title">layering</Highlighter> various <Highlighter type="title">shapes.</Highlighter>
      </h2>
      <h2 id="headerRoot__shape-layer" class="headerRoot__h2-variation">Creates a world<br>
        by <Highlighter type="title">shaping</Highlighter> various <Highlighter type="title">layers.</Highlighter>
      </h2>
    </div>
	  <p>전남대학교 컴퓨터정보통신공학과<br>
    @ 지능영상미디어인터페이스연구실</p>
    <p>군 복무 D-{milEnterDDay}, 제대까지 D-{milExitDDay}<br>as 네트워크운용정비 병과</p>
  </div>
</headerRoot>

<style lang="scss">
	headerRoot {
    margin: 0 auto;
    position: relative;
    display: flex;
    height: 100vh;
    align-content: center;
    flex-direction: column;
    user-select: none;

    div.headerRoot__wrapper {
      margin: auto;
      display: block;
      width: 100%;
      max-width: 800px;

      h1 {
        font-size: 1em;
        font-weight: 500;
      }
      div.headerRoot__h2-wrapper {
        position: relative;
        h2 {
          font-size: 3em;
          font-weight: 600;
          transition: .5s ease-in-out;
        }
        h2.headerRoot__h2-variation {
          position: absolute;
          margin: 0;
          top: 0;
        }
        #headerRoot__shape-layer {
          opacity: 0;
        }
      }

      p {
        line-height: 1.6;
      }
    }
	}

	@media (min-width: 640px) {
		headerRoot {
			max-width: none;
		}
	}
</style>