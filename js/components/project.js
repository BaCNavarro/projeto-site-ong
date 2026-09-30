/** Cartão de projeto e galeria de adoção. */
import { html } from '../core/template.js';
import { ORG } from '../data/content.js';
import { iconBadge, image } from './common.js';

const galleryItem = (img) => html`
  <figure class="gallery__item">${image(img, { lazy: true })}</figure>
`;

/** Primeira foto em destaque; as demais empilhadas ao lado. */
export const gallery = ([featured, ...rest]) => html`
  <div class="gallery">
    ${galleryItem(featured)}
    ${rest.length > 0 ? html`<div class="gallery__stack">${rest.map(galleryItem)}</div>` : ''}
  </div>
`;

const projectCta = ({ text, label, variant }) => html`
  <div class="project__cta">
    <p class="project__cta-text"><strong>${text}</strong></p>
    <a class="btn btn--${variant}" href="${ORG.whatsappUrl}" target="_blank" rel="noopener noreferrer">${label}</a>
  </div>
`;

export const projectCard = (project) => html`
  <article class="project reveal${project.urgent ? ' project--urgent' : ''}" id="projeto-${project.id}">
    <div class="project__header">
      ${iconBadge(project.icon, 'project__icon')}
      <div>
        <span class="project__tag${project.urgent ? ' project__tag--urgent' : ''}">${project.tag}</span>
        <h3 class="project__title">${project.title}</h3>
      </div>
    </div>
    <p>${project.description}</p>
    ${project.gallery ? gallery(project.gallery) : ''}
    ${project.cta ? projectCta(project.cta) : ''}
  </article>
`;
