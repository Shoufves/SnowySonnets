(function () {
  "use strict";

  var container = document.getElementById("error-bubbles");
  if (!container) return;

  var BUBBLE_COUNT = 30;
  var BASE_SIZE = 260;
  var SIZE_VARIANCE = 44;
  var INTERVAL = 120;

  function inProtectedZone(x, y, w, h) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    // 保护中间区域：文字 + little_Es5
    var zoneLeft = vw * 0.25;
    var zoneRight = vw * 0.75;
    var zoneTop = vh * 0.12;
    var zoneBottom = vh * 0.72;
    return x < zoneRight && x + w > zoneLeft && y < zoneBottom && y + h > zoneTop;
  }

  function addBubble() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var size = BASE_SIZE + (Math.random() * 2 - 1) * SIZE_VARIANCE;
    var maxX = Math.max(vw - size, 0);
    var maxY = Math.max(vh - size, 0);
    var x = 0;
    var y = 0;
    var tries = 0;
    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      tries++;
    } while (inProtectedZone(x, y, size, size) && tries < 80);

    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.width = size + "px";
    bubble.style.height = (size * 0.56) + "px"; // 与 bubble_frame 比例 666:375 接近
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    bubble.style.animationDelay = "0s";
    container.appendChild(bubble);
  }

  var count = 0;
  var timer = setInterval(function () {
    addBubble();
    count++;
    if (count >= BUBBLE_COUNT) {
      clearInterval(timer);
    }
  }, INTERVAL);
})();
