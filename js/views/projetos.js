/** View: Nossos Projetos (#/projetos) */
import { html } from '../core/template.js';
import { PROJECTS } from '../data/content.js';
import { pageHero } from '../components/common.js';
import { projectCard } from '../components/project.js';

export default {
  title: 'Projetos',

  render: () => html`
    ${pageHero({
      eyebrow: 'O que fazemos',
      title: 'Nossas Iniciativas Solidárias',
      lead: 'Conheça os projetos que mantêm a nossa missão viva e ajudam a salvar centenas de animais todos os anos.',
    })}

    <section id="iniciativas" class="section">
      <div class="container">
        ${PROJECTS.map(projectCard)}
      </div>
    </section>
  `,
};
