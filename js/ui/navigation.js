/**
 * Comportamentos globais de navegação:
 * - marca o link da rota atual (aria-current);
 * - fecha o menu mobile ao navegar ou ao pressionar Esc;
 * - move o foco para o título da nova página (acessibilidade em SPAs);
 * - faz o link "pular para o conteúdo" focar o conteúdo sem mudar a rota;
 * - aplica sombra ao cabeçalho quando a página é rolada.
 */

const HEADER_SCROLL_OFFSET = 8;

export function setActiveLink(path) {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    if (link.getAttribute('href') === `#${path}`) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

export function closeMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  if (toggle) toggle.checked = false;
}

/** Leva o foco para o título da view, anunciando a troca de página. */
export function focusViewHeading(outlet) {
  const heading = outlet.querySelector('[data-view-heading]');
  if (!heading) return;

  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

function watchHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () =>
    header.classList.toggle('site-header--scrolled', window.scrollY > HEADER_SCROLL_OFFSET);

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function closeMenuOnEscape() {
  document.addEventListener('keydown', (event) => {
    const toggle = document.getElementById('nav-toggle');
    if (event.key === 'Escape' && toggle?.checked) {
      toggle.checked = false;
      toggle.focus();
    }
  });
}

/**
 * "Pular para o conteúdo" move o foco sem alterar o hash: a URL continua
 * apontando para a rota atual ao recarregar ou compartilhar.
 */
function bindSkipLink() {
  const link = document.querySelector('.skip-link');
  const target = document.getElementById('conteudo');
  if (!link || !target) return;

  link.addEventListener('click', (event) => {
    event.preventDefault();
    target.focus();
    target.scrollIntoView();
  });
}

export function initNavigation() {
  watchHeaderScroll();
  closeMenuOnEscape();
  bindSkipLink();
}
