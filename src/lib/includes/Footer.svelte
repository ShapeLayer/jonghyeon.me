<script lang="ts">
  import LocaleSelectorNav from "$lib/components/LocaleSelectorNav.svelte";
  import type { VerticalSpacing } from '$lib/models/presets';

  let {
    verticalSpacing = {},
    hideBadges = false,
    hideLocaleSelector = false,
    hideCopyright = false
  }: {
    verticalSpacing?: VerticalSpacing;
    hideBadges?: boolean;
    hideLocaleSelector?: boolean;
    hideCopyright?: boolean;
  } = $props();

</script>
<style>
footer {
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 2em;
  width: 100%;
  max-width: 800px;
  padding: 1em;
  display: flex;
}

footer .footer-content {
  margin: 1em 0;
}

footer .badges {
  margin-bottom: .5em;
}

footer img#unicode-sponser {
  width: 8em;
}

</style>
<footer style:margin-top={verticalSpacing.marginTop} style:margin-bottom={verticalSpacing.marginBottom} style:padding-top={verticalSpacing.paddingTop} style:padding-bottom={verticalSpacing.paddingBottom}>
  <div class="footer">
    {#if !hideBadges}<div id="footer-badges" class="footer-content">
      <p class="badges">
        <a class="no-hover" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank" rel="noreferrer">
          <img id="unicode-sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" alt="Unicode Consortium Official Bronze Sponser">
        </a>
      </p>
    </div>{/if}
    {#if !hideLocaleSelector}<div id="footer-localeselector" class="footer-content"><LocaleSelectorNav /></div>{/if}
    {#if !hideCopyright}<div id="footer-copyright" class="footer-content">
      <p class="copy">&copy; Park Jonghyeon / ShapeLayer.</p>
      <p><a href="https://github.com/ShapeLayer/jonghyeon.me" target="_blank" rel="noreferrer">ShapeLayer/jonghyeon.me</a></p>
    </div>{/if}
  </div>
</footer>
