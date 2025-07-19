<style>
.wave-container {  
  height: 40vh;
  background: url("$lib/assets/ivory-grid.jpeg") no-repeat center center;
  position: relative;
}

.wave-container::before {   
  content: "";
  width: 100%;
  height: 86px;
  position: absolute;
  bottom: -0.3%;
  left: 0;
  background-size: auto;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200 112' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 0C22.4434 -1 28.9842 2 55 20C94.1849 45 121.997 48 158.5 48C198.5 50 200 37 240 43C280 50 320 75 360 75C400 75 440 50 480 45C520 41 560 58 600 70C640 83 680 91 720 95C760 100 800 100 840 87C880 75 920 50 960 52C1000 54 1040 83 1080 79C1120 75 1127.5 50 1147.5 31C1171.48 9 1185.65 0 1200 0V112H1180C1160 112 1120 112 1080 112C1040 112 1000 112 960 112C920 112 880 112 840 112C800 112 760 112 720 112C680 112 640 112 600 112C560 112 520 112 480 112C440 112 400 112 360 112C320 112 280 112 240 112C200 112 160 112 120 112C80 112 40 112 20 112H0V0.0103865Z' fill='%23ffffff'/></svg>");
}

@media(max-width: 850px) {
  .wave-container::before {    
    height: 43px
  }
}

.wave-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

<div class="wave-container"><slot /></div>
