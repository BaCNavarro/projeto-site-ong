/** View: rota inexistente (404) */
import { html } from '../core/template.js';

export default {
  title: 'Página não encontrada',

  render: () => html`
    <section class="section">
      <div class="container not-found animate-in">
        <span class="not-found__icon" aria-hidden="true">🐾</span>
        <h2 data-view-heading>Página não encontrada</h2>
        <p class="lead">O endereço que você acessou não existe ou foi movido.</p>
        <a class="btn btn--primary" href="#/">Voltar ao início</a>
      </div>
    </section>
  `,
};
