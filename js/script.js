<script>
// =======================
// SCROLL REVEAL
// =======================
const reveals = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);


// =======================
// PARALLAX IMAGE
// =======================
const parallaxImg = document.querySelector(".parallax img");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (parallaxImg) {
    parallaxImg.style.transform = `
      translateY(${scrollY * 0.08}px)
      scale(${1 + scrollY * 0.0002})
    `;
  }
});


// =======================
// MAGNETIC BUTTON EFFECT
// =======================
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
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