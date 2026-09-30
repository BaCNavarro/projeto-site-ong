/** View: Seja um Colaborador (#/cadastro) */
import { html } from '../core/template.js';
import { BENEFITS } from '../data/content.js';
import { pageHero } from '../components/common.js';
import { mountCadastro } from '../features/cadastro/cadastro-controller.js';

export default {
  title: 'Colabore',

  render: () => html`
    ${pageHero({
      eyebrow: 'Seja um Colaborador',
      title: 'Junte-se à nossa causa',
      lead: 'Preencha o formulário abaixo para se tornar um voluntário, doador ou lar temporário. Os seus dados estão seguros conosco.',
    })}

    <section id="cadastro" class="section">
      <div class="container grid-12 form-wrapper">
        <div class="col-lg-8" data-slot="cadastro"></div>

        <aside class="aside-panel reveal col-lg-4">
          <h3 class="aside-panel__title">Por que colaborar?</h3>
          <ul class="aside-panel__list">
            ${BENEFITS.map((benefit) => html`<li class="aside-panel__item">${benefit}</li>`)}
          </ul>
        </aside>
      </div>
    </section>
  `,

  mount(root) {
    return mountCadastro(root.querySelector('[data-slot="cadastro"]'));
  },
};
