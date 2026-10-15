const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('.portfolio-section:not(#cases), .portfolio-project')];
const aliases = { '#projects': '#additional-about', '#flowly': '#additional-about', '#notifications': '#additional-experience' };
function resolveLegacyHash() {
  const target = aliases[location.hash];
  if (target) {
    history.replaceState(null, '', target);
    document.querySelector(target)?.scrollIntoView();
  }
}
function updateActiveSection() {
  const marker = Math.min(window.innerHeight * 0.3, 240);
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) active = section;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sections.at(-1);
  links.forEach(link => {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
let pending = false;
window.addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { updateActiveSection(); pending = false; });
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('hashchange', () => { resolveLegacyHash(); updateActiveSection(); });
window.addEventListener('load', () => { resolveLegacyHash(); updateActiveSection(); });
updateActiveSection();
