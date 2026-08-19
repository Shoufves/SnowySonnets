(function () {
  "use strict";

  var library = document.getElementById("library");
  if (!library) return;

  var tree = document.getElementById("tree");
  var directoryPane = document.getElementById("directory-pane");
  var articlePane = document.getElementById("article-pane");
  var articleWelcome = document.getElementById("article-welcome");
  var articleView = document.getElementById("article-view");
  var articleBody = document.getElementById("article-body");
  var backBtn = document.getElementById("back-btn");
  var breadcrumb = document.getElementById("breadcrumb");
  var articleBreadcrumb = document.getElementById("article-breadcrumb");

  var isMobile = function () {
    return window.matchMedia("(max-width: 1023px)").matches;
  };

  var rootList = tree
    ? tree.querySelector(":scope > .tree-list") || tree.querySelector(".tree-list")
    : null;
  // mobileStack 保存移动端目录层级，最后一项是当前显示的层级
  var mobileStack = rootList ? [{ title: "根目录", list: rootList }] : [];
  var returnList = null; // 移动端打开文章时所在目录层级
  var currentArticleUrl = null;
  var loading = false;
  var touchStartX = null;
  var touchStartY = null;

  function showArticlePane() {
    if (articleWelcome) articleWelcome.hidden = true;
    if (articleView) articleView.hidden = false;
    library.classList.add("article-open");
    if (isMobile()) {
      library.classList.add("mobile-article-open");
    }
    if (articlePane) articlePane.scrollTop = 0;
  }

  function hideArticlePane() {
    library.classList.remove("article-open", "mobile-article-open");
    if (articleView) articleView.hidden = true;
    if (articleWelcome) articleWelcome.hidden = false;
    if (articleBreadcrumb) articleBreadcrumb.textContent = "";
    currentArticleUrl = null;
  }

  function renderBreadcrumb() {
    if (!breadcrumb) return;
    if (!isMobile()) {
      breadcrumb.innerHTML = "";
      return;
    }
    var html = "";
    for (var i = 0; i < mobileStack.length; i++) {
      var item = mobileStack[i];
      if (i === mobileStack.length - 1) {
        html += "<span>" + escapeHtml(item.title) + "</span>";
      } else {
        html += '<button type="button" data-level="' + i + '">' + escapeHtml(item.title) + "</button>";
      }
      if (i < mobileStack.length - 1) html += " / ";
    }
    breadcrumb.innerHTML = html;
    Array.prototype.forEach.call(breadcrumb.querySelectorAll("[data-level]"), function (btn) {
      btn.addEventListener("click", function () {
        var level = parseInt(btn.getAttribute("data-level"), 10);
        jumpToLevel(level);
      });
    });
  }

  function renderArticleBreadcrumb(articleTitle) {
    if (!articleBreadcrumb) return;
    if (!isMobile()) {
      articleBreadcrumb.innerHTML = "";
      return;
    }
    var parts = mobileStack.map(function (item) {
      return item.title;
    });
    if (articleTitle) parts.push(articleTitle);
    articleBreadcrumb.textContent = parts.join(" / ");
  }

  function setActivePath(list) {
    if (!tree || !list) return;
    // 收集从根到当前 list 的所有祖先 tree-list
    var chain = [];
    var el = list;
    while (el && el !== tree) {
      if (el.classList && el.classList.contains("tree-list")) {
        chain.unshift(el);
      }
      el = el.parentElement;
    }
    // 只保留路径上的 active，避免隐藏祖先导致子列表不可见
    Array.prototype.forEach.call(tree.querySelectorAll(".tree-list.active"), function (item) {
      if (chain.indexOf(item) === -1) {
        item.classList.remove("active");
      }
    });
    chain.forEach(function (item) {
      item.classList.add("active");
    });
  }

  function showMobileList(list, title) {
    if (!tree) return;
    setActivePath(list);
    mobileStack = mobileStack.slice(0, mobileStack.length);
    if (title && mobileStack.length) {
      mobileStack[mobileStack.length - 1].title = title;
    }
    renderBreadcrumb();
  }

  function enterMobileDirectory(li) {
    var childList = li.querySelector(":scope > .tree-list") || li.querySelector(".tree-list");
    if (!childList) return;
    var dirTitle = li.getAttribute("data-title") || "目录";
    mobileStack.push({ title: dirTitle, list: childList });
    showMobileList(childList, dirTitle);
  }

  function leaveMobileDirectory() {
    if (mobileStack.length <= 1) return;
    mobileStack.pop();
    var current = mobileStack[mobileStack.length - 1];
    showMobileList(current.list, current.title);
  }

  function jumpToLevel(level) {
    if (level < 0 || level >= mobileStack.length) return;
    mobileStack = mobileStack.slice(0, level + 1);
    var current = mobileStack[mobileStack.length - 1];
    showMobileList(current.list, current.title);
  }

  function openArticle(url, title) {
    if (!url || loading) return;
    if (url === currentArticleUrl) {
      showArticlePane();
      return;
    }

    loading = true;
    currentArticleUrl = url;
    articleBody.innerHTML = '<p class="search-empty">加载中…</p>';
    showArticlePane();

    fetch(url, { headers: { Accept: "text/html" } })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var body = doc.querySelector("#article-body");
        if (!body) throw new Error("article body not found");
        articleBody.innerHTML = body.innerHTML;
        if (!title) {
          var h1 = articleBody.querySelector("h1");
          title = h1 ? h1.textContent.trim() : "";
        }
        renderArticleBreadcrumb(title);
        if (history.pushState) {
          history.pushState({ articleUrl: url }, "", url);
        }
      })
      .catch(function () {
        articleBody.innerHTML =
          '<p class="search-empty">文章加载失败，请稍后重试。</p>';
      })
      .finally(function () {
        loading = false;
      });
  }

  function closeArticle() {
    hideArticlePane();
    if (history.pushState) {
      history.pushState({ articleUrl: null }, "", window.location.pathname);
    }
    if (isMobile() && returnList) {
      showMobileList(returnList);
      returnList = null;
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  if (tree) {
    tree.addEventListener("click", function (e) {
      var fileLink = e.target.closest("a.file-row");
      if (fileLink) {
        e.preventDefault();
        if (isMobile() && rootList) {
          returnList = tree.querySelector(".tree-list.active") || rootList;
        }
        var fileLabel = fileLink.querySelector(".tree-label");
        openArticle(fileLink.href, fileLabel ? fileLabel.textContent.trim() : "");
        return;
      }

      var dirRow = e.target.closest(".dir-row");
      if (dirRow) {
        var li = dirRow.parentElement;
        if (isMobile()) {
          enterMobileDirectory(li);
        } else {
          li.classList.toggle("open");
          var expanded = li.classList.contains("open");
          dirRow.setAttribute("aria-expanded", expanded ? "true" : "false");
        }
      }
    });

    tree.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var dirRow = e.target.closest(".dir-row");
      if (dirRow) {
        e.preventDefault();
        var li = dirRow.parentElement;
        if (isMobile()) {
          enterMobileDirectory(li);
        } else {
          li.classList.toggle("open");
          var expanded = li.classList.contains("open");
          dirRow.setAttribute("aria-expanded", expanded ? "true" : "false");
        }
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", closeArticle);
  }

  // 文章内的“上一篇/下一篇”也在文章库内无刷新切换
  if (articlePane) {
    articlePane.addEventListener("click", function (e) {
      var navLink = e.target.closest(".post-nav a");
      if (navLink) {
        e.preventDefault();
        if (isMobile() && rootList) {
          returnList = tree.querySelector(".tree-list.active") || rootList;
        }
        var titleEl = navLink.textContent.replace(/^[←→\s]+|[←→\s]+$/g, "").trim();
        openArticle(navLink.href, titleEl);
      }
    });
  }

  // 移动端：文章界面右滑返回目录
  if (articlePane) {
    articlePane.addEventListener(
      "touchstart",
      function (e) {
        if (!isMobile() || !library.classList.contains("mobile-article-open")) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    articlePane.addEventListener(
      "touchend",
      function (e) {
        if (!isMobile() || !library.classList.contains("mobile-article-open")) return;
        if (touchStartX === null || touchStartY === null) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        // 右滑距离足够，且竖向位移不大，避免与上下滚动冲突
        if (dx > 60 && Math.abs(dy) < 40) {
          closeArticle();
        }
        touchStartX = null;
        touchStartY = null;
      },
      { passive: true }
    );
  }

  // 浏览器前进/后退
  window.addEventListener("popstate", function (e) {
    var state = e.state;
    if (state && state.articleUrl) {
      openArticle(state.articleUrl);
    } else {
      hideArticlePane();
      if (isMobile() && returnList) {
        showMobileList(returnList);
        returnList = null;
      }
    }
  });

  // 初始显示移动端根目录
  if (isMobile() && rootList) {
    showMobileList(rootList, "根目录");
  } else if (breadcrumb) {
    breadcrumb.innerHTML = "";
  }
})();
