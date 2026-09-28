/* Paila Creation — contact form.
   Two modes, chosen by the form's data-endpoint attribute:
   - endpoint set:   POST to that URL; success is shown only after a confirmed 2xx response.
   - endpoint empty: validate, then open a pre-filled email draft (mailto). Nothing is sent
                     by this page, so the wording never claims a message was delivered.
   No keys or secrets belong in this file. */
(function () {
  "use strict";

  var form = document.getElementById("inquiry-form");
  if (!form) return;

  var RECIPIENT = "info@pailacreation.com";
  var endpoint = (form.getAttribute("data-endpoint") || "").trim();
  var submitBtn = form.querySelector("[data-submit]");
  var submitLabel = form.querySelector("[data-submit-label]");
  var modeNote = form.querySelector("[data-mode-note]");
  var status = document.getElementById("form-status");
  var fallback = document.getElementById("copy-fallback");
  var preview = document.getElementById("message-preview");
  var copyBtn = document.getElementById("copy-message");
  var copyStatus = document.getElementById("copy-status");
  var serviceSelect = form.elements.service;

  var SERVICES = {
    websites: "Website design and development",
    "web-apps": "Web application",
    android: "Android application",
    desktop: "Desktop application",
    "it-solutions": "IT solutions",
    other: "Not sure yet"
  };

  /* Preselect a service from ?service=… (whitelisted values only) */
  try {
    var requested = new URLSearchParams(window.location.search).get("service");
    if (requested && Object.prototype.hasOwnProperty.call(SERVICES, requested) && serviceSelect) {
      serviceSelect.value = requested;
    }
  } catch (e) { /* URLSearchParams unsupported: leave the default */ }

  /* The page works without JS as a plain mailto form; take over now. */
  form.setAttribute("novalidate", "");
  form.removeAttribute("action");
  form.removeAttribute("enctype");

  if (endpoint) {
    var intro = document.querySelector("[data-mode-intro]");
    if (intro) intro.textContent = "Fields marked “required” are needed so we can reply.";
    if (submitLabel) submitLabel.textContent = "Send inquiry";
    if (modeNote) modeNote.textContent = "Your details are sent securely to Paila Creation. You'll see a confirmation here once it has been received.";
  }

  /* ---------- Validation ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var rules = {
    name: function (v) { return v ? "" : "Enter your name."; },
    email: function (v) {
      if (!v) return "Enter your email address.";
      return EMAIL_RE.test(v) ? "" : "Enter an email address in the format name@example.com.";
    },
    message: function (v) {
      if (!v) return "Tell us a little about your project.";
      return v.length < 10 ? "Add a few more details so we understand what you need." : "";
    }
  };
  var attempted = false;

  function validateField(name) {
    var field = form.elements[name];
    var error = document.getElementById(name + "-error");
    if (!field || !error) return true;
    var message = rules[name](field.value.trim());
    error.textContent = message;
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
    return !message;
  }

  function validateAll() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
    });
    return firstInvalid;
  }

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    field.addEventListener("blur", function () {
      if (attempted || field.value.trim()) validateField(name);
    });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(name);
    });
  });

  /* ---------- Status helpers ---------- */
  function showStatus(kind, title, body) {
    if (!status) return;
    status.className = "form-status is-" + kind;
    status.innerHTML = "";
    var strong = document.createElement("strong");
    strong.textContent = title;
    status.appendChild(strong);
    if (body) {
      var p = document.createElement("p");
      p.textContent = body;
      status.appendChild(p);
    }
    status.hidden = false;
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.disabled = busy;
    submitBtn.setAttribute("aria-busy", String(busy));
    var spinner = submitBtn.querySelector(".spinner");
    if (busy && !spinner) {
      spinner = document.createElement("span");
      spinner.className = "spinner";
      spinner.setAttribute("aria-hidden", "true");
      submitBtn.insertBefore(spinner, submitBtn.firstChild);
    } else if (!busy && spinner) {
      spinner.remove();
    }
    if (submitLabel) submitLabel.textContent = busy ? "Sending…" : "Send inquiry";
  }

  /* ---------- Compose message ---------- */
  function values() {
    var service = serviceSelect && serviceSelect.value ? SERVICES[serviceSelect.value] || "" : "";
    return {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company ? form.elements.company.value.trim() : "",
      service: service,
      message: form.elements.message.value.trim()
    };
  }

  function composeBody(v) {
    var lines = [
      "Name: " + v.name,
      "Email: " + v.email
    ];
    if (v.company) lines.push("Company: " + v.company);
    if (v.service) lines.push("Service of interest: " + v.service);
    lines.push("", "Project description:", v.message);
    return lines.join("\r\n");
  }

  function composeSubject(v) {
    return "Project inquiry" + (v.service ? " – " + v.service : "") + " (" + v.name + ")";
  }

  /* ---------- Copy fallback ---------- */
  if (copyBtn && preview) {
    copyBtn.addEventListener("click", function () {
      var text = preview.value;
      var done = function (ok) {
        if (copyStatus) {
          copyStatus.textContent = ok
            ? "Message copied. Paste it into an email to " + RECIPIENT + "."
            : "Copy didn't work automatically. Select the text above and copy it manually.";
        }
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { legacyCopy(); });
      } else {
        legacyCopy();
      }
      function legacyCopy() {
        preview.focus();
        preview.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        done(ok);
      }
    });
  }

  /* ---------- Submit ---------- */
  var inFlight = false;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (inFlight) return;
    attempted = true;

    var firstInvalid = validateAll();
    if (firstInvalid) {
      showStatus("error", "Please check the highlighted fields.", "Some required information is missing or needs correcting.");
      firstInvalid.focus();
      return;
    }

    // Honeypot: silently stop obvious bots.
    if (form.elements.website && form.elements.website.value) return;

    var v = values();

    if (endpoint) {
      inFlight = true;
      setBusy(true);
      if (status) status.hidden = true;
      var data = new FormData(form);
      data.set("service", v.service);
      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        showStatus("success", "Thank you — your inquiry has been received.", "Paila Creation will reply to " + v.email + ".");
        form.reset();
        attempted = false;
      }).catch(function () {
        showStatus("error", "Your inquiry could not be sent.", "Your details are still in the form. Please try again, or email " + RECIPIENT + " directly.");
      }).then(function () {
        inFlight = false;
        setBusy(false);
      });
      return;
    }

    // Mailto mode: prepare a draft in the visitor's email app.
    var subject = composeSubject(v);
    var body = composeBody(v);
    var href = "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    if (preview) preview.value = "To: " + RECIPIENT + "\r\nSubject: " + subject + "\r\n\r\n" + body;
    if (fallback) fallback.hidden = false;
    if (copyStatus) copyStatus.textContent = "";

    var tooLong = href.length > 1900;
    showStatus(
      "info",
      "Your email draft is ready — it has not been sent yet.",
      (tooLong
        ? "Your description is long, so some email apps may shorten the draft. "
        : "") +
      "Your email app should open with a message addressed to " + RECIPIENT +
      ". Review it and press send there. If no email app opened, copy the message below and send it yourself."
    );

    window.location.href = href;
  });
})();
