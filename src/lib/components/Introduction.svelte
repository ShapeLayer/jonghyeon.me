<script lang="ts">
  import { onMount } from 'svelte';
  import ExternalLink from './ExternalLink.svelte';
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
        <ExternalLink href="https://blog.jonghyeon.me" target="_blank" rel="noopener noreferrer">Blog</ExternalLink>
        <ExternalLink href="https://note.jonghyeon.me" target="_blank" rel="noopener noreferrer">Note</ExternalLink>
      </div>
      <div>
        <ExternalLink href="https://www.instagram.com/__jong.hyeon__/" target="_blank" rel="noopener noreferrer">Instagram</ExternalLink>
      </div>
    </div>  
  </div>
  <div class="description" bind:this={descriptionElement}>
    <p>안녕하세요! 컴퓨터공학을 전공하고 있는 박종현입니다. 영문 별칭으로는 주로 ShapeLayer라는 이름을 사용합니다.</p>
    <p>크게 다쳐 병원에서 생활했던 어린 시절, 옆 자리의 컴퓨터공학 전공 대학원생을 흉내내며 컴퓨터를 시작하게 되었습니다. 이어서는 "멋진 사람들"을 따라잡겠다는 열망으로 Visual Basic, C, Java를 무작정 따라하며 컴퓨터공학자의 꿈을 키웠습니다.</p>
    <p>2019년 재학 중이었던 고등학교의 학생회로부터 &lt;숭덕고 청원페이지&gt; 개발 수주, 2019광주SW체험축전에서의 &lt;한글코드로 만드는 디스코드 챗봇&gt; 체험 소프트웨어 개발, 2020년 &lt;악질이름생성기&gt;를 계기로 본격적으로 프로그래밍을 시작하게 되었습니다.</p>
  </div>
</div>
