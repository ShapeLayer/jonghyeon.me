<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='works-typst-packages'
  title={m.career_title_works_typst_packages()}
>
  {m.career_details_works_typst_packages()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_contents_works_typst_packages_title()}
      subtitle='Typst'
    >
      <div class="content">
        <p>{m.career_contents_works_typst_packages_body_1()}</p>
      </div>
      <CareerItemDetailSubsection id='works-typst-packages-ucpc-solutions' title='ucpc-solutions__typst'>
        <div class="content">
          <p>{m.career_contents_works_typst_packages_ucpc_solutions_body_1()}</p>
          <p>{m.career_contents_works_typst_packages_ucpc_solutions_body_2()}</p>
        </div>
        <div class="content">
          <p>
            {m.see_more()}: <ExternalLink href='https://github.com/ShapeLayer/ucpc-solutions__typst'>GitHub</ExternalLink>
            <ExternalLink href='https://typst.app/universe/package/ucpc-solutions'>Typst Universe</ExternalLink>
          </p>
        </div>
      </CareerItemDetailSubsection>
      <CareerItemDetailSubsection id='works-typst-packages-furiruby' title='furiruby'>
        <div class="content">
          <p>{m.career_contents_works_typst_packages_furiruby_body_1()}</p>
          <p>{m.career_contents_works_typst_packages_furiruby_body_2()}</p>
        </div>
        <div class="content">
          <p>
            {m.see_more()}: <ExternalLink href='https://github.com/ShapeLayer/furiruby'>GitHub</ExternalLink>
            <ExternalLink href='https://typst.app/universe/package/furiruby'>Typst Universe</ExternalLink>
          </p>
        </div>
      </CareerItemDetailSubsection>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
