// abadie.digital — small progressive enhancements. Page works without JS.
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Nav border on scroll
  var nav = document.querySelector(".site-nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Close mobile menu after choosing a link
  document.querySelectorAll("#siteNav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var menu = document.getElementById("siteNav");
      if (menu.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Lightweight YouTube embeds: show thumbnail, load the player only on click
  var SVG_NS = "http://www.w3.org/2000/svg";
  function playIcon() {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M6 4l14 8-14 8z");
    svg.appendChild(path);
    return svg;
  }

  document.querySelectorAll(".yt[data-yt]").forEach(function (box) {
    var id = box.getAttribute("data-yt");
    if (!/^[\w-]{11}$/.test(id)) return;
    var title = box.getAttribute("data-title") || "video";
    box.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "yt-play";
    btn.setAttribute("aria-label", "Play: " + title);
    btn.appendChild(playIcon());
    box.appendChild(btn);
    box.classList.add("is-ready");

    box.addEventListener("click", function (ev) {
      if (box.classList.contains("is-playing")) return;
      ev.preventDefault();
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      box.classList.add("is-playing");
      iframe.focus();
      if (typeof window.gtag === "function") {
        window.gtag("event", "video_play", { video_id: id, video_title: title });
      }
    });
  });

  // Writing filters
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".writing-list li");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.getAttribute("data-filter");
      filters.forEach(function (b) {
        var on = b === f;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      items.forEach(function (li) {
        var cats = (li.getAttribute("data-cat") || "").split(" ");
        li.hidden = !(cat === "all" || cats.indexOf(cat) !== -1);
      });
    });
  });
})();
