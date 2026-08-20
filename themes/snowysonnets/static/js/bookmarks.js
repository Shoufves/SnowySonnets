(function () {
  "use strict";

  var STORAGE_KEY = "snowysonnets_bookmarks_v1";

  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveBookmarks(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getScrollContainer() {
    var pane = document.getElementById("article-pane");
    if (pane && !pane.hidden) return pane;
    return document.scrollingElement || document.documentElement;
  }

  function getScrollTop(container) {
    if (container === document.scrollingElement || container === document.documentElement) {
      return window.scrollY || document.documentElement.scrollTop || 0;
    }
    return container.scrollTop || 0;
  }

  function getMaxScroll(container) {
    if (container === document.scrollingElement || container === document.documentElement) {
      var doc = document.documentElement;
      return Math.max(0, doc.scrollHeight - window.innerHeight);
    }
    return Math.max(0, container.scrollHeight - container.clientHeight);
  }

  function getProgress() {
    var container = getScrollContainer();
    var max = getMaxScroll(container);
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, getScrollTop(container) / max));
  }

  function updateProgressText() {
    var pct = Math.round(getProgress() * 100);
    var els = document.querySelectorAll(".reading-progress");
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = pct + "%";
    }
  }

  function setScroll(container, top) {
    if (container === document.scrollingElement || container === document.documentElement) {
      window.scrollTo(0, top);
    } else {
      container.scrollTop = top;
    }
  }

  function currentArticleUrl() {
    var pane = document.getElementById("article-pane");
    if (pane && pane.dataset.currentUrl) return pane.dataset.currentUrl;
    return window.location.href;
  }

  function addBookmark() {
    var url = currentArticleUrl();
    if (!url || url.indexOf("about:") === 0) {
      alert("请先打开一篇文章再添加书签。");
      return;
    }
    var name = window.prompt("请输入书签名：", "未命名书签");
    if (name === null) return;
    name = name.trim() || "未命名书签";
    var list = getBookmarks();
    list.push({
      id: Date.now(),
      name: name,
      url: url,
      progress: getProgress(),
      createdAt: new Date().toISOString()
    });
    saveBookmarks(list);
    alert("书签已添加：" + name);
  }

  function renderBookmarksPage() {
    var listEl = document.getElementById("bookmarks-list");
    if (!listEl) return;
    var list = getBookmarks();
    if (!list.length) {
      listEl.innerHTML = '<p class="search-empty">还没有书签。</p>';
      return;
    }
    var html = list
      .slice()
      .reverse()
      .map(function (bm) {
        var pct = Math.round((bm.progress || 0) * 100);
        return (
          '<div class="bookmark-item">' +
          '<a class="bookmark-link" href="' +
          escapeHtml(bm.url) +
          '#bookmark-' +
          bm.id +
          '">' +
          "<strong>" +
          escapeHtml(bm.name) +
          "</strong>" +
          "<span>" +
          pct +
          "%</span>" +
          "</a>" +
          '<button class="bookmark-delete" type="button" data-id="' +
          bm.id +
          '">删除</button>' +
          "</div>"
        );
      })
      .join("");
    listEl.innerHTML = html;

    var delBtns = listEl.querySelectorAll(".bookmark-delete");
    for (var i = 0; i < delBtns.length; i++) {
      delBtns[i].addEventListener("click", function () {
        var id = parseInt(this.getAttribute("data-id"), 10);
        saveBookmarks(getBookmarks().filter(function (b) {
          return b.id !== id;
        }));
        renderBookmarksPage();
      });
    }
  }

  function restoreFromHash() {
    var m = window.location.hash.match(/^#bookmark-(\d+)$/);
    if (!m) return;
    var id = parseInt(m[1], 10);
    var bm = getBookmarks().filter(function (b) {
      return b.id === id;
    })[0];
    if (!bm) return;
    setTimeout(function () {
      var container = getScrollContainer();
      var max = getMaxScroll(container);
      setScroll(container, max * (bm.progress || 0));
      updateProgressText();
    }, 150);
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // 书签页
    if (document.getElementById("bookmarks-page")) {
      renderBookmarksPage();
    }

    // 文章页/文章库：绑定书签按钮和进度
    var btn = document.getElementById("bookmark-btn");
    if (btn) {
      btn.addEventListener("click", addBookmark);
    }

    var pane = document.getElementById("article-pane");
    if (pane) {
      pane.addEventListener("scroll", updateProgressText, { passive: true });
    }
    window.addEventListener("scroll", updateProgressText, { passive: true });
    updateProgressText();

    // 从书签跳转后恢复进度
    restoreFromHash();
  });
})();
