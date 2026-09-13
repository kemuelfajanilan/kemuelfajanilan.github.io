const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const accentToggle = document.getElementById("accentToggle");
const accentPanel = document.getElementById("accentPanel");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");

const ACCENTS = {
  "#6d5dfc": "109, 93, 252",
  "#00a8ff": "0, 168, 255",
  "#00b894": "0, 184, 148",
  "#ff7a00": "255, 122, 0",
  "#e84393": "232, 67, 147"
};

function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");

  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "☾" : "☼";
  }

  localStorage.setItem("portfolio-theme", theme);
}

function applyAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty(
    "--accent-rgb",
    ACCENTS[color] || "109, 93, 252"
  );
  localStorage.setItem("portfolio-accent", color);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) {
  applyAccent(savedAccent);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(body.classList.contains("light") ? "dark" : "light");
  });
}

if (accentToggle && accentPanel) {
  accentToggle.addEventListener("click", () => {
    const isOpen = accentPanel.classList.toggle("open");
    accentPanel.setAttribute("aria-hidden", String(!isOpen));
  });

  document.addEventListener("click", event => {
    if (!accentPanel.contains(event.target) && !accentToggle.contains(event.target)) {
      accentPanel.classList.remove("open");
      accentPanel.setAttribute("aria-hidden", "true");
    }
  });
}

document.querySelectorAll("[data-accent]").forEach(button => {
  button.addEventListener("click", () => {
    applyAccent(button.dataset.accent);

    if (accentPanel) {
      accentPanel.classList.remove("open");
      accentPanel.setAttribute("aria-hidden", "true");
    }
  });
});

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 130;
  let current = "home";

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

// =========================
// CONTACT FORM — FORMSPREE
// =========================

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const submitButtonText = document.getElementById("submitButtonText");
const formNote = document.getElementById("formNote");

function setFormState(message, type = "default") {
  if (!formNote) return;

  formNote.textContent = message;
  formNote.classList.remove("form-success", "form-error");

  if (type === "success") {
    formNote.classList.add("form-success");
  }

  if (type === "error") {
    formNote.classList.add("form-error");
  }
}

function setFormLoading(isLoading) {
  if (!submitButton || !submitButtonText) return;

  submitButton.disabled = isLoading;
  submitButton.setAttribute("aria-busy", String(isLoading));
  submitButtonText.textContent = isLoading ? "Sending..." : "Send Message";
}

if (contactForm) {
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const endpoint = contactForm.getAttribute("action");

    if (!endpoint) {
      setFormState(
        "The contact form is not configured yet. Please contact me by email instead.",
        "error"
      );
      return;
    }

    setFormLoading(true);
    setFormState("Sending your message...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        setFormState(
          "✓ Message sent successfully. Thank you for reaching out!",
          "success"
        );
        return;
      }

      let message = "Unable to send your message right now. Please try again.";

      try {
        const data = await response.json();

        if (Array.isArray(data.errors) && data.errors.length > 0) {
          message = data.errors
            .map(error => error.message)
            .filter(Boolean)
            .join(" ");
        }
      } catch {
        // Use the fallback message when Formspree does not return JSON.
      }

      setFormState(message, "error");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormState(
        "A network error occurred. Please try again or use the email link beside the form.",
        "error"
      );
    } finally {
      setFormLoading(false);
    }
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
