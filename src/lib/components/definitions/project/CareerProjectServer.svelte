<script lang="ts">
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<CareerItem id="project-server" title="server" hideDatetime>
  <ul>
    <li><ExternalLink href="https://github.com/ShapeLayer/server">GitHub</ExternalLink></li>
    <li>{m.career_details_project_server()}</li>
  </ul>
</CareerItem>
