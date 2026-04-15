<script lang="ts">
  import { onMount } from 'svelte';
  import ExternalLink from './ExternalLink.svelte';
  import { m } from '$lib/paraglide/messages';
  const FEED_ORIGIN = 'https://blog.jonghyeon.me';
  const FEED_RESIZE_MESSAGE_TYPE = 'embed-feed-resize';
  const MIN_FEED_HEIGHT = 160;
  const MAX_FEED_HEIGHT = 1200;

  let scrollY: number = 0;
  let introductionElement: HTMLDivElement | null = null;
  let descriptionElement: HTMLDivElement | null = null;
  let feedIframeElement: HTMLIFrameElement | null = null;

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

  const handleFeedResizeMessage = (event: MessageEvent) => {
    if (event.origin !== FEED_ORIGIN || !feedIframeElement) {
      return;
    }

    if (event.source !== feedIframeElement.contentWindow) {
      return;
    }

    const payload = event.data as { type?: string; height?: number };
    if (payload?.type !== FEED_RESIZE_MESSAGE_TYPE) {
      return;
    }

    const nextHeight = Number(payload.height);
    if (!Number.isFinite(nextHeight) || nextHeight <= 0) {
      return;
    }

    const clampedHeight = Math.min(Math.max(Math.ceil(nextHeight), MIN_FEED_HEIGHT), MAX_FEED_HEIGHT);
    feedIframeElement.style.height = `${clampedHeight}px`;
  }

  onMount(init);
</script>

<svelte:window
  bind:scrollY={scrollY}
  onscroll={handleScrollY}
  onmessage={handleFeedResizeMessage}
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

.embed-feed {
  margin: 1.2em 0;
}

.embed-feed iframe {
  width: 100%;
  height: 200px;
  border: 0;
  background: transparent;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
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
        <ExternalLink href="https://blog.jonghyeon.me" target="_blank" rel="noopener noreferrer">Blog</ExternalLink>
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
    <div class="embed-feed">
      <iframe
        bind:this={feedIframeElement}
        src="https://blog.jonghyeon.me/static/embed-feed/"
        title="Latest blog posts"
        loading="lazy"
        draggable="false"
      ></iframe>
    </div>
  </div>
</div>
