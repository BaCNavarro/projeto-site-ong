/** View: exibida quando uma página falha ao renderizar. */
import { html } from '../core/template.js';

export default {
  title: 'Erro ao carregar a página',

  render: () => html`
    <section class="section">
      <div class="container not-found animate-in">
        <span class="not-found__icon" aria-hidden="true">🐾</span>
        <h2 data-view-heading>Não foi possível exibir esta página</h2>
        <p class="lead">Ocorreu um erro inesperado. Tente recarregar ou volte ao início.</p>
        <a class="btn btn--primary" href="#/">Voltar ao início</a>
      </div>
    </section>
  `,
};
