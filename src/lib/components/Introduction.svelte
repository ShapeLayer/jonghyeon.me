<script lang="ts">
  import ExternalLink from './ExternalLink.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { VerticalSpacing } from '$lib/models/presets';
  const FEED_ORIGIN = 'https://blog.jonghyeon.me';
  const FEED_RESIZE_MESSAGE_TYPE = 'embed-feed-resize';
  const MIN_FEED_HEIGHT = 160;
  const MAX_FEED_HEIGHT = 1200;

  let {
    disableSummary = false,
    disableDescription = false,
    disableEmbed = false,
    enableScrollAdjustment = true,
    descriptionMarginTop = '4em',
    shownParagraphs = [0, 1, 2],
    recentPostsCount = 5,
    hideEmailLink = false,
    hideGithubLink = false,
    hideBlogLink = false,
    hideInstagramLink = false,
    verticalSpacing = {}
  }: {
    disableSummary?: boolean;
    disableDescription?: boolean;
    disableEmbed?: boolean;
    enableScrollAdjustment?: boolean;
    descriptionMarginTop?: string;
    shownParagraphs?: number[];
    recentPostsCount?: number;
    hideEmailLink?: boolean;
    hideGithubLink?: boolean;
    hideBlogLink?: boolean;
    hideInstagramLink?: boolean;
    verticalSpacing?: VerticalSpacing;
  } = $props();

  let feedUrl = $derived(`${FEED_ORIGIN}/static/embed-feed/?posts=${recentPostsCount}`);
  let estimatedFeedHeight = $derived(
    Math.min(Math.max(70 + Math.max(1, recentPostsCount) * 30, MIN_FEED_HEIGHT), MAX_FEED_HEIGHT)
  );

  let scrollY = $state(0);
  let feedIframeElement: HTMLIFrameElement | null = null;

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
  };

</script>

<style>
  .contacts .contacts-row {
    display: flex;
    gap: 1rem;
    margin-top: 0.4rem;
  }

  h2 {
    font-size: 1.5em;
    margin: 0;
  }

  .summary.scroll-adjusted {
    transform: translateY(var(--scroll-offset));
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

<svelte:window bind:scrollY onmessage={handleFeedResizeMessage} />

<div class="introduction" style:margin-top={verticalSpacing.marginTop} style:margin-bottom={verticalSpacing.marginBottom} style:padding-top={verticalSpacing.paddingTop} style:padding-bottom={verticalSpacing.paddingBottom}>
  {#if !disableSummary}<div class="summary" class:scroll-adjusted={enableScrollAdjustment} style:--scroll-offset={enableScrollAdjustment ? `${Math.min(Math.max(scrollY, 0), 100)}px` : '0px'}>
      <div class="name">
        <h2>Park, "ShapeLayer" Jonghyeon</h2>
      </div>
      <div class="contacts">
        {#if !hideEmailLink}
          <div class="contacts-row">
            <ExternalLink href="mailto:jng.hyn.park@gmail.com">jng.hyn.park@gmail.com</ExternalLink>
          </div>
        {/if}
        {#if !hideGithubLink || !hideBlogLink}
          <div class="contacts-row">
            {#if !hideGithubLink}<ExternalLink href="https://github.com/shapelayer">GitHub</ExternalLink>{/if}
            {#if !hideBlogLink}<ExternalLink href="https://blog.jonghyeon.me">{m.extlink_site_blog()}</ExternalLink>{/if}
          </div>
        {/if}
        {#if !hideInstagramLink}
          <div>
            <ExternalLink href="https://www.instagram.com/__jong.hyeon__/">Instagram</ExternalLink>
          </div>
        {/if}
      </div>
    </div>{/if}
  {#if !disableDescription}<div class="description" style:margin-top={enableScrollAdjustment && !disableSummary ? `calc(100px + ${descriptionMarginTop})` : descriptionMarginTop}>
      {#if shownParagraphs.includes(0)}<p>{m.profile_intro_description_1()}</p>{/if}
      {#if shownParagraphs.includes(1)}<p>{m.profile_intro_description_2_1()}<br />{m.profile_intro_description_2_2()}</p>{/if}
      {#if shownParagraphs.includes(2)}<p>{m.profile_intro_description_3()}</p>{/if}
    </div>{/if}
  {#if !disableEmbed}<div class="embed-feed">
      <iframe
        bind:this={feedIframeElement}
        src={feedUrl}
        title="Latest blog posts"
        loading="lazy"
        draggable="false"
        style:height={`${estimatedFeedHeight}px`}
      ></iframe>
    </div>{/if}
</div>
