<style lang="scss">
@keyframes circle-animation {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }

  30% {
    opacity: 0;
    transform: translateY(0px);
  }
  50% {
    opacity: 1;
  }
  70% {
    opacity: 0;
    transform: translateY(18px);
  }
  100% {
    opacity: 0;
    transform: translateY(18px);
  }
  @media (pointer:none), (pointer:coarse) {
    0% { transform: translateY(20px); }
    30% { transform: translateY(20px); }
    70% { transform: translateY(2px); }
    100% { transform: translateY(2px); }
  }
}
rect {
  stroke: white;
}
circle {
  fill: white;
  animation: 2.5s ease 0s infinite normal none running circle-animation;
}
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 42" class="css-361ppy">
  <rect x="1" y="1" width="20" height="40" rx="10" fill="transparent" stroke-width="2" stroke="white"></rect>
  <circle id="circle" cx="11" cy="11" r="5" class="css-1xwg794"></circle>
</svg>
