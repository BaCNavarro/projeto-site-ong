/** Templates específicos do fluxo de cadastro. */
import { html } from '../../core/template.js';
import { HELP_OPTIONS } from '../../data/content.js';
import { formStep } from '../../components/form-fields.js';
import { CADASTRO_STEPS } from './cadastro-schema.js';

export const cadastroForm = () => html`
  <form class="form" id="form-cadastro" action="#" method="POST" novalidate>
    <div class="form__notice" data-draft-notice hidden>
      <p class="form__notice-text">
        <span aria-hidden="true">💾</span>
        Recuperamos os dados que você começou a preencher.
      </p>
      <button class="form__notice-action" type="button" data-action="descartar-rascunho">Começar do zero</button>
    </div>

    <div class="form__summary" data-error-summary role="alert" tabindex="-1" hidden></div>

    ${CADASTRO_STEPS.map(formStep)}

    <button class="btn btn--primary btn--block" type="submit" data-submit>Enviar Cadastro</button>
    <p class="form__footnote">Campos marcados com <abbr title="obrigatório">*</abbr> são obrigatórios. Seus dados ficam salvos neste navegador.</p>
  </form>
`;

const formatDate = (iso) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso));

const helpLabel = (value) => HELP_OPTIONS.find((option) => option.value === value)?.title ?? value;

export const cadastroSuccess = (record, total) => html`
  <div class="form-success" tabindex="-1" data-success>
    <span class="form-success__icon" aria-hidden="true">🐾</span>
    <h3 class="form-success__title">Obrigado, ${record.nome.split(' ')[0]}!</h3>
    <p class="form-success__text">
      Seu cadastro como <strong>${helpLabel(record.interesse)}</strong> foi registrado.
      O contato será feito pelo WhatsApp <strong>${record.telefone}</strong>.
    </p>
    <p class="form-success__meta">Cadastro nº ${total} · salvo neste navegador em ${formatDate(record.criadoEm)}</p>
    <button class="btn btn--outline" type="button" data-action="novo-cadastro">Fazer outro cadastro</button>
  </div>
`;
