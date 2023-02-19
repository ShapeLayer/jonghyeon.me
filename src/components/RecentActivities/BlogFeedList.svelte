<script lang="ts" context="module">
  export const blogFeed = 'https://blog.jonghyeon.me/feed.xml'
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import CareersSectionContent from '../Careers/CareersSectionContent.svelte'

  let parseds: Array<Object>

  const loadXMLToParseds = (xml: Document) => {
    let entries: HTMLCollection = xml.getElementsByTagName('entry')
    let parsed: Array<Object> = []
    for (let i = 0; i < entries.length; i++) {
      parsed.push({
        title: entries[i].getElementsByTagName('title')[0].innerText,
        link: entries[i].getElementsByTagName('link')[0].href,
        published: parseDateToString(new Date(entries[i].getElementsByTagName('published')[0].innerHTML))
      })
    }
    return parsed
  }

  const parseDateToString = (date: Date) => {
    return `${date.getFullYear}.${date.getMonth}.${date.getDate}`
  }

  const getBlogFeed = () => {
    const xhr: XMLHttpRequest = new XMLHttpRequest
    xhr.open('GET', '')
    xhr.responseType = 'document'
    xhr.overrideMimeType('text/xml')
    xhr.onload = () => {
      if (xhr.readyState == xhr.DONE && xhr.status == 200) loadXMLToParseds(xhr.responseXML)
    }
    xhr.send()
  }

  const init = () => {
    getBlogFeed() // => loadXMLToParseds
  }
  onMount(init)
</script>

{#each parseds as parsed}
  <CareersSectionContent
    name={parsed['title']}
    date={parsed['published']}
    url={parsed['link']}
  />
{/each}