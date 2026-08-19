(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
      });
    }
  });
})();
