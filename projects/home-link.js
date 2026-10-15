document.querySelectorAll("[data-home-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (window.location.protocol === "file:") {
      return;
    }

    event.preventDefault();
    window.location.href = link.dataset.cleanHref || "./";
  });
});

const typewriter = document.querySelector("[data-typewriter]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typewriter && !prefersReducedMotion) {
  const text = typewriter.dataset.typewriter || typewriter.textContent;
  let index = 0;
  typewriter.textContent = "";
  typewriter.classList.add("is-typing");

  const type = () => {
    typewriter.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(type, 34);
    } else {
      window.setTimeout(() => {
        typewriter.classList.remove("is-typing");
      }, 600);
    }
  };

  type();
}
