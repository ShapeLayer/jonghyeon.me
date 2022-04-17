<div>
<span><slot /></span>
</div>

<style lang="scss">
  div {
    position: relative;
    display: block;
    padding: .5em .75em;
    width: 100%;
    color: #F0F0F0;
    background-color: #4E4B42;
    span {
      vertical-align: middle;
      line-height: normal;
    }
    ::before {
      margin: 0 .5em 0 0;
      width: 1em;
      height: 1em;
      display: inline-block;
      background-color: #F0F0F0;
      vertical-align: text-top;
      line-height: normal;
      content: "";
    }
  }
</style>