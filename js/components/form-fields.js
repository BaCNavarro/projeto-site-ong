/**
 * Templates de campos de formulário gerados a partir de um esquema
 * (ver features/cadastro/cadastro-schema.js).
 *
 * Todo campo segue a mesma estrutura, que o validador reconhece:
 *   [data-field] → controle(s) + mensagem de erro [data-error]
 */
import { html, attrs } from '../core/template.js';

const requiredMark = html`<abbr title="obrigatório">*</abbr>`;

const errorMessage = (name) => html`
  <span class="form__error" id="${name}-erro" data-error aria-live="polite" hidden></span>
`;

export const textField = (field) => html`
  <div class="form__field" data-field="${field.name}">
    <label class="form__label" for="${field.name}">${field.label} ${requiredMark}</label>
    <input class="form__input" ${attrs({
      id: field.name,
      name: field.name,
      type: field.type ?? 'text',
      placeholder: field.placeholder,
      autocomplete: field.autocomplete,
      inputmode: field.inputmode,
      maxlength: field.maxlength,
      'data-mask': field.mask,
      'aria-describedby': `${field.name}-erro`,
      required: true,
    })}>
    ${errorMessage(field.name)}
  </div>
`;

export const choiceField = (field) => html`
  <div class="form__field" data-field="${field.name}" role="radiogroup" aria-label="${field.label}" aria-describedby="${field.name}-erro">
    <div class="choice-group">
      ${field.options.map((option, index) => html`
        <div class="choice">
          <input class="choice__input" type="radio" id="${field.name}-${option.value}" name="${field.name}" value="${option.value}"${index === 0 ? html` required` : ''}>
          <label class="choice__label" for="${field.name}-${option.value}">
            <span class="choice__text">
              <strong class="choice__title">${option.title}</strong>
              <small class="choice__desc">${option.description}</small>
            </span>
          </label>
        </div>
      `)}
    </div>
    ${errorMessage(field.name)}
  </div>
`;

export const checkboxField = (field) => html`
  <div class="form__field" data-field="${field.name}">
    <div class="check">
      <input class="check__input" type="checkbox" id="${field.name}" name="${field.name}" required aria-describedby="${field.name}-erro">
      <label class="check__label" for="${field.name}">${field.text}</label>
    </div>
    ${errorMessage(field.name)}
  </div>
`;

const FIELD_TEMPLATES = {
  choice: choiceField,
  checkbox: checkboxField,
};

const renderField = (field) => (FIELD_TEMPLATES[field.type] ?? textField)(field);

/** Um item de `fields` pode ser um campo ou um array de campos (mesma linha). */
const renderFieldOrRow = (item) =>
  Array.isArray(item) ? html`<div class="form__row">${item.map(renderField)}</div>` : renderField(item);

export const formStep = (step, index) => html`
  <fieldset class="form__fieldset">
    <legend class="form__legend"><span class="form__step" aria-hidden="true">${index + 1}</span> ${step.legend}</legend>
    ${step.fields.map(renderFieldOrRow)}
  </fieldset>
`;
