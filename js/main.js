// =======================
// SCROLL REVEAL
// =======================
const reveals = document.querySelectorAll(".reveal");

function revealOnLoad() {
  reveals.forEach(el => {
    el.classList.add("active");
  });
}

window.addEventListener("load", revealOnLoad);


// =======================
// PARALLAX
// =======================
const img = document.querySelector(".parallax img");

window.addEventListener("scroll", () => {
  if (img) {
    img.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }
});


// =======================
// BUTTON EFFECT
// =======================
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});


// =======================
// COPY EMAIL
// =======================
const email = document.getElementById("email");

if (email) {
  email.addEventListener("click", () => {
    navigator.clipboard.writeText(email.innerText);
    email.innerText = "Copied!";
    setTimeout(() => {
      email.innerText = "srijitabiswas05@email.com";
    }, 1500);
  });
}