<script lang="ts">
  import { onMount } from 'svelte';
  import ExternalLink from './ExternalLink.svelte';
  import { m } from '$lib/paraglide/messages';
  let scrollY: number = 0;
  let introductionElement: HTMLDivElement | null = null;
  let descriptionElement: HTMLDivElement | null = null;

  const handleScrollY = (e?: Event) => {
    if (descriptionElement) {
      if (scrollY < 100) {
        descriptionElement.style.marginTop = `calc(${100 - scrollY}px + 4em)`;
      }
    }

    if (introductionElement) { 
      introductionElement.style.marginTop = `calc(${Math.min(scrollY, 100)}px)`;
    }
  }

  const init = () => {
    handleScrollY();
  }

  onMount(init);
</script>

<svelte:window
  bind:scrollY={scrollY}
  onscroll={handleScrollY}
/>

<style>
.contacts .contacts-row {
  display: flex;
  gap: 1rem;
  margin-top: .4rem;
}

h2 {
  font-size: 1.5em;
  margin: 0;
}

.description {
  margin-top: 4em;  /* not actually works, refer to handleScrollY */
}
.description p {
  margin: 1em 0;
  line-height: 1.6;
}
</style>

<div class="introduction" bind:this={introductionElement}>
  <div class="summary">
    <div class="name">
      <h2>Park, "ShapeLayer" Jonghyeon</h2>
    </div>
    <div class=contacts>
      <div class="contacts-row">
        <ExternalLink href="mailto:me@jonghyeon.me">me@jonghyeon.me</ExternalLink>
      </div>
      <div class="contacts-row">
        <ExternalLink href="https://github.com/shapelayer" target="_blank" rel="noopener noreferrer">GitHub</ExternalLink>
        <ExternalLink href="https://blog.jonghyeon.me" target="_blank" rel="noopener noreferrer">Diary<sup>Blog</sup></ExternalLink>
        <ExternalLink href="https://note.jonghyeon.me" target="_blank" rel="noopener noreferrer">Studies<sup>Blog</sup></ExternalLink>
      </div>
      <div>
        <ExternalLink href="https://www.instagram.com/__jong.hyeon__/" target="_blank" rel="noopener noreferrer">Instagram</ExternalLink>
      </div>
    </div>  
  </div>
  <div class="description" bind:this={descriptionElement}>
    <p>{m.profile_intro_description_1()}</p>
    <p>{m.profile_intro_description_2()}</p>
    <p>{m.profile_intro_description_3()}</p>
  </div>
</div>
