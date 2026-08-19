(function () {
  "use strict";

  var dataEl = document.getElementById("search-data");
  var input = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");

  if (!dataEl || !input || !resultsEl) return;

  var data = [];
  try {
    data = JSON.parse(dataEl.textContent || "[]");
  } catch (err) {
    data = [];
  }

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function search(keyword) {
    var q = normalize(keyword.trim());
    if (!q) return [];

    return data.filter(function (item) {
      var haystack = [
        item.title,
        item.description,
        item.section,
        item.path,
        (item.tags || []).join(" "),
        (item.categories || []).join(" "),
        item.content
      ]
        .join(" ")
        .toLowerCase();

      return haystack.indexOf(q) !== -1;
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  function render(items) {
    if (!items.length) {
      resultsEl.innerHTML = '<p class="search-empty">没有找到相关文章。</p>';
      return;
    }

    var html = items
      .slice(0, 30)
      .map(function (item) {
        var desc = item.description || "这篇文章没有摘要。";
        return (
          '<a class="search-result" href="' +
          escapeHtml(item.url) +
          '">' +
          "<h3>" +
          escapeHtml(item.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(desc) +
          "</p>" +
          '<small>' +
          escapeHtml(item.date || "") +
          "</small>" +
          "</a>"
        );
      })
      .join("");

    resultsEl.innerHTML = html;
  }

  input.addEventListener("input", function () {
    render(search(input.value));
  });

  // 进入页面时展示全部文章列表作为初始结果
  render(data.slice(0, 20).map(function (item) {
    return item;
  }));
})();
