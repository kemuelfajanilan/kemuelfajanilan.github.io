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
  themeToggle.textContent = theme === "light" ? "☾" : "☼";
  localStorage.setItem("portfolio-theme", theme);
}

function applyAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--accent-rgb", ACCENTS[color] || "109, 93, 252");
  localStorage.setItem("portfolio-accent", color);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

const savedAccent = localStorage.getItem("portfolio-accent");
if (savedAccent) applyAccent(savedAccent);

themeToggle.addEventListener("click", () => {
  applyTheme(body.classList.contains("light") ? "dark" : "light");
});

accentToggle.addEventListener("click", () => {
  const isOpen = accentPanel.classList.toggle("open");
  accentPanel.setAttribute("aria-hidden", String(!isOpen));
});

document.querySelectorAll("[data-accent]").forEach(button => {
  button.addEventListener("click", () => {
    applyAccent(button.dataset.accent);
    accentPanel.classList.remove("open");
    accentPanel.setAttribute("aria-hidden", "true");
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", event => {
  if (!accentPanel.contains(event.target) && !accentToggle.contains(event.target)) {
    accentPanel.classList.remove("open");
    accentPanel.setAttribute("aria-hidden", "true");
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 130;
  let current = "home";

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  // TODO: Replace with your real email address.
  const destinationEmail = "kemuel.faala.fajanilan@gmail.com";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:${destinationEmail}?subject=${mailSubject}&body=${mailBody}`;
});

currentYear.textContent = new Date().getFullYear();
