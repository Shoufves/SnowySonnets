(function () {
  "use strict";

  var container = document.getElementById("error-bubbles");
  if (!container) return;

  var character = document.getElementById("error-character");
  var BUBBLE_COUNT = 100;
  var SIZE_VARIANCE = 40;
  var INTERVAL = 40;

  var vw = window.innerWidth;
  var vh = window.innerHeight;
  var BASE_SIZE = Math.min(220, Math.max(110, vw * 0.22));

  // 保护文字区域与 little_Es5 / little_Es1 所在区域
  function inProtectedZone(x, y, w, h) {
    var zones = [
      { left: vw * 0.2, right: vw * 0.8, top: vh * 0.05, bottom: vh * 0.2 },
      { left: vw * 0.32, right: vw * 0.68, top: vh * 0.32, bottom: vh * 0.62 }
    ];
    for (var i = 0; i < zones.length; i++) {
      var z = zones[i];
      if (x < z.right && x + w > z.left && y < z.bottom && y + h > z.top) {
        return true;
      }
    }
    return false;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function addBubble() {
    var size = BASE_SIZE + (Math.random() * 2 - 1) * SIZE_VARIANCE;
    var height = size * 0.56;
    var x = 0;
    var y = 0;
    var tries = 0;

    // 全屏均匀随机生成；若碰到文字/角色保护区域则重新随机
    do {
      x = Math.random() * Math.max(vw - size, 0);
      y = Math.random() * Math.max(vh - height, 0);
      x = clamp(x, 0, Math.max(vw - size, 0));
      y = clamp(y, 0, Math.max(vh - height, 0));
      tries++;
    } while (inProtectedZone(x, y, size, height) && tries < 200);

    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.width = size + "px";
    bubble.style.height = height + "px";
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    container.appendChild(bubble);
  }

  function swapCharacter() {
    if (!character) return;
    setTimeout(function () {
      character.style.transition = "opacity 0.5s ease";
      character.style.opacity = "0";
      setTimeout(function () {
        var src = character.getAttribute("data-swap-src");
        if (src) character.src = src;
        character.style.opacity = "1";
      }, 500);
    }, 1000);
  }

  var count = 0;
  var timer = setInterval(function () {
    addBubble();
    count++;
    if (count >= BUBBLE_COUNT) {
      clearInterval(timer);
      swapCharacter();
    }
  }, INTERVAL);
})();
