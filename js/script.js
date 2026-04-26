<script>
// =======================
// SCROLL REVEAL — FIXED
// =======================
const reveals = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerBottom = window.innerHeight; // full viewport height — catches everything visible

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
}

// Run on scroll
window.addEventListener("scroll", handleReveal);

// Run immediately when DOM is ready (fixes elements already in viewport)
document.addEventListener("DOMContentLoaded", handleReveal);

// Run again after everything loads (images, fonts, etc.)
window.addEventListener("load", handleReveal);

// Safety fallback: show everything after 1.2s no matter what
setTimeout(() => {
  reveals.forEach(el => el.classList.add("active"));
}, 1200);


// =======================
// PARALLAX IMAGE
// =======================
const parallaxImg = document.querySelector(".parallax img");

window.addEventListener("scroll", () => {
  if (parallaxImg) {
    const scrollY = window.scrollY;
    parallaxImg.style.transform = `translateY(${scrollY * 0.08}px) scale(${1 + scrollY * 0.0002})`;
  }
});


// =======================
// MAGNETIC BUTTON EFFECT
// =======================
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
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
</script>