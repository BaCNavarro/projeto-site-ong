/** Componentes de apresentação compartilhados entre as páginas. */
import { html } from '../core/template.js';

export const iconBadge = (icon, modifierClass = '') => html`
  <span class="icon-badge ${modifierClass}" aria-hidden="true">${icon}</span>
`;

/**
 * Cabeçalho das páginas internas.
 * O título recebe data-view-heading: é para ele que o foco vai ao trocar de rota.
 */
export const pageHero = ({ eyebrow, title, lead }) => html`
  <section class="page-hero">
    <div class="container animate-in">
      <span class="eyebrow">${eyebrow}</span>
      <h2 class="page-hero__title" data-view-heading>${title}</h2>
      <p class="lead">${lead}</p>
    </div>
  </section>
`;

export const valueCard = ({ icon, title, text }) => html`
  <li class="card reveal col-md-6">
    ${iconBadge(icon, 'card__icon')}
    <strong class="card__title">${title}</strong>
    <p class="card__text">${text}</p>
  </li>
`;

export const image = ({ src, alt, width, height }, { lazy = false } = {}) => html`
  <img src="${src}" alt="${alt}" width="${width}" height="${height}"${lazy ? html` loading="lazy"` : ''}>
`;
