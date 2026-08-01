
const data = window.PORTFOLIO_DATA || [];
const grid = document.getElementById("portfolio-grid");
const gate = document.getElementById("gate");
const gallery = document.getElementById("gallery");
let pending = null;

grid.innerHTML = data.map(item => `
<article class="discipline reveal">
  <div class="icon" aria-hidden="true">${item.icon}</div>
  <h3>${item.title}</h3>
  <p>${item.description}</p>
  <button type="button" data-category="${item.id}">View selected works →</button>
</article>`).join("");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function openModal(modal){
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-close]").forEach(x => x.addEventListener("click", () => closeModal(gate)));
document.querySelectorAll("[data-gallery-close]").forEach(x => x.addEventListener("click", () => closeModal(gallery)));

document.querySelectorAll("[data-category]").forEach(btn => btn.addEventListener("click", () => {
  pending = data.find(x => x.id === btn.dataset.category);
  if (sessionStorage.getItem("portfolioUnlocked") === "true") openGallery(pending);
  else openModal(gate);
}));

async function sha256(text){
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,"0")).join("");
}

document.getElementById("gate-form").addEventListener("submit", async e => {
  e.preventDefault();
  const hash = await sha256(document.getElementById("password").value);
  if (hash === window.PORTFOLIO_PASSWORD_HASH){
    sessionStorage.setItem("portfolioUnlocked","true");
    document.getElementById("message").textContent = "";
    closeModal(gate);
    openGallery(pending);
  } else {
    document.getElementById("message").textContent = "That password was not recognized. Please try again.";
  }
});

function openGallery(item){
  if (!item) return;
  document.getElementById("gallery-title").textContent = item.title;
  document.getElementById("gallery-summary").textContent = item.description;
  document.getElementById("gallery-items").innerHTML = item.works.map((work, i) => `
    <article class="gallery-item">
      <span>SELECTED WORK ${String(i+1).padStart(2,"0")}</span>
      <h3>${work}</h3>
      <p>Replace this placeholder with a concise project overview, outcome and link to the relevant PDF, image, webpage or case study.</p>
    </article>`).join("");
  openModal(gallery);
}

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();
