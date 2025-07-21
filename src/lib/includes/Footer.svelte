<script>
  import LocaleSelectorNav from "$lib/components/LocaleSelectorNav.svelte";

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
<footer>
  <div class="footer">
    <div class="footer-content">
      <p class="badges">
        <a class="no-hover" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank" rel="noreferrer">
          <img id="unicode-sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" alt="Unicode Consortium Official Bronze Sponser">
        </a>
      </p>
    </div>
    <div class="footer-content"><LocaleSelectorNav /></div>
    <div class="footer-content">
      <p class="copy">&copy; Park Jonghyeon / ShapeLayer.</p>
      <p><a href="https://github.com/ShapeLayer/jonghyeon.me" target="_blank" rel="noreferrer">ShapeLayer/jonghyeon.me</a></p>
    </div>
  </div>
</footer>
