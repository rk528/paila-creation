/* Paila Creation — shared behaviour: header state, mobile menu, reveals.
   Every feature is optional: without this script all content and navigation still work. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var mobileQuery = window.matchMedia("(max-width: 899.98px)");

  if (toggle && nav) {
    var label = toggle.querySelector(".nav-toggle-label");

    var setOpen = function (open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      }
    });

    // Close when focus or a click leaves the header while the menu is open.
    document.addEventListener("focusin", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" && header && !header.contains(event.target)) {
        setOpen(false);
      }
    });
    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" && header && !header.contains(event.target)) {
        setOpen(false);
      }
    });

    // Close after choosing an in-page link.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && mobileQuery.matches) setOpen(false);
    });

    var handleViewport = function () {
      if (!mobileQuery.matches) setOpen(false);
    };
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", handleViewport);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(handleViewport);
    }
  }

  /* ---------- Section reveals ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    revealItems.forEach(function (item) {
      // Anything already on screen stays visible from the first paint.
      var rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });
    root.classList.add("reveal-ready");
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
