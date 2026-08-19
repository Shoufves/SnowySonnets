(function () {
  "use strict";

  var container = document.getElementById("error-bubbles");
  if (!container) return;

  var character = document.getElementById("error-character");
  var BUBBLE_COUNT = 30;
  var SIZE_VARIANCE = 40;
  var INTERVAL = 100;

  var vw = window.innerWidth;
  var vh = window.innerHeight;
  var BASE_SIZE = Math.min(260, Math.max(140, vw * 0.3));

  // 生成覆盖全屏的网格候选点，避免气泡只聚集在某个区域
  var gridPoints = [];

  function buildGrid() {
    var cols = 6;
    var rows = 5;
    var points = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        points.push({
          x: ((c + 0.5) * vw) / cols,
          y: ((r + 0.5) * vh) / rows
        });
      }
    }
    // 洗牌，让顺序随机但整体仍覆盖全屏
    for (var i = points.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = points[i];
      points[i] = points[j];
      points[j] = t;
    }
    gridPoints = points;
  }

  function inProtectedZone(x, y, w, h) {
    // 保护文字区域与 little_Es5 / little_Es1 所在区域
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
    var height = size * 0.56; // 与 bubble_frame 比例接近
    var x = 0;
    var y = 0;
    var tries = 0;

    do {
      var point = gridPoints.length ? gridPoints.pop() : null;
      if (point) {
        x = point.x - size / 2 + (Math.random() * 40 - 20);
        y = point.y - height / 2 + (Math.random() * 40 - 20);
      } else {
        x = Math.random() * Math.max(vw - size, 0);
        y = Math.random() * Math.max(vh - height, 0);
      }
      x = clamp(x, 0, Math.max(vw - size, 0));
      y = clamp(y, 0, Math.max(vh - height, 0));
      tries++;
    } while (inProtectedZone(x, y, size, height) && tries < 100);

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

  buildGrid();

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
