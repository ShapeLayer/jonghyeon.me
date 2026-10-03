<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id="works-package-maintaining" title={m.career_title_works_typst_maintaining()}>
  <ul>
    <li>HanNLP:
      <ExternalLink href="https://cran.r-project.org/web/packages/HanNLP/index.html">
        CRAN
      </ExternalLink>
    </li>
    <li>kilo-goal-plugin
      <ExternalLink href="https://www.npmjs.com/package/@shapelayer/kilo-goal-plugin">
        npm
      </ExternalLink>
    </li>
    <li>ucpc-solutions: 
      <ExternalLink href="https://typst.app/universe/package/ucpc-solutions">
        Typst Universe
      </ExternalLink>
    </li>
    <li>
      furiruby: 
      <ExternalLink href="https://typst.app/universe/package/furiruby">
        Typst Universe
      </ExternalLink>
    </li>
  </ul>
</CareerItem>
