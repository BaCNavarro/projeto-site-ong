/**
 * Motor de validação de formulários com feedback acessível.
 *
 * Comportamento:
 * - O campo é validado ao sair dele (blur). Antes disso, nenhum erro aparece.
 * - Depois do primeiro contato, revalida a cada digitação, e o erro some
 *   assim que a pessoa corrige.
 * - No envio, valida tudo, mostra um resumo dos erros (role="alert") com
 *   atalhos para cada campo e move o foco para esse resumo.
 * - Marca aria-invalid e liga a mensagem ao campo via aria-describedby,
 *   para que leitores de tela anunciem o erro.
 *
 * Estrutura esperada de cada campo:
 *   <div data-field="nome"> … <input name="nome"> … <span data-error></span></div>
 * Resumo de erros (opcional): <div data-error-summary hidden></div>
 */
import { html, render } from '../../core/template.js';

export function createFormValidator(form, { fields, onValid }) {
  const names = Object.keys(fields);
  const touched = new Set();
  const summary = form.querySelector('[data-error-summary]');

  const fieldWrapper = (name) => form.querySelector(`[data-field="${name}"]`);

  function getValue(name) {
    const control = form.elements.namedItem(name);
    if (!control) return '';
    if (control instanceof RadioNodeList) return control.value;
    if (control.type === 'checkbox') return control.checked;
    return control.value.trim();
  }

  function getValues() {
    return Object.fromEntries(names.map((name) => [name, getValue(name)]));
  }

  function validateField(name, values = getValues()) {
    const failed = fields[name].rules.find((rule) => !rule.test(values[name], values));
    return failed ? failed.message : '';
  }

  function showFieldState(name, message) {
    const wrapper = fieldWrapper(name);
    if (!wrapper) return;

    const value = getValue(name);
    const errorEl = wrapper.querySelector('[data-error]');
    const controls = wrapper.querySelectorAll('input, select, textarea');

    wrapper.classList.toggle('is-invalid', Boolean(message));
    wrapper.classList.toggle('is-valid', !message && value !== '' && value !== false);
    controls.forEach((control) => control.setAttribute('aria-invalid', String(Boolean(message))));

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = !message;
    }
  }

  function renderSummary(errors) {
    if (!summary) return;

    if (errors.length === 0) {
      summary.hidden = true;
      summary.innerHTML = '';
      return;
    }

    render(summary, html`
      <p class="form__summary-title">
        ${errors.length === 1 ? 'Falta corrigir 1 campo' : `Faltam corrigir ${errors.length} campos`}:
      </p>
      <ul class="form__summary-list">
        ${errors.map(({ name, message }) => html`
          <li class="form__summary-item"><button type="button" class="form__summary-link" data-focus-field="${name}">${fields[name].label}: ${message}</button></li>
        `)}
      </ul>
    `);
    summary.hidden = false;
  }

  function focusField(name) {
    const control = fieldWrapper(name)?.querySelector('input, select, textarea');
    control?.focus();
  }

  /** Força um erro vindo de fora (ex.: CPF já cadastrado). */
  function setError(name, message) {
    touched.add(name);
    showFieldState(name, message);
    renderSummary([{ name, message }]);
    focusField(name);
  }

  function validateAll() {
    const values = getValues();
    const errors = names
      .map((name) => ({ name, message: validateField(name, values) }))
      .filter(({ message }) => message);

    names.forEach((name) => {
      touched.add(name);
      showFieldState(name, errors.find((e) => e.name === name)?.message ?? '');
    });

    return errors;
  }

  // ---------- Eventos ----------
  function onFocusOut(event) {
    const { name } = event.target;
    if (!fields[name]) return;
    // Em grupos de rádio, só valida quando o foco sai do grupo inteiro
    if (event.target.type === 'radio' && fieldWrapper(name)?.contains(event.relatedTarget)) return;

    touched.add(name);
    showFieldState(name, validateField(name));
  }

  function onInput(event) {
    const { name } = event.target;
    if (!fields[name]) return;
    if (event.type === 'change' && ['radio', 'checkbox'].includes(event.target.type)) touched.add(name);
    if (touched.has(name)) showFieldState(name, validateField(name));
  }

  function onSubmit(event) {
    event.preventDefault();
    const errors = validateAll();
    renderSummary(errors);

    if (errors.length > 0) {
      summary ? summary.focus() : focusField(errors[0].name);
      return;
    }

    onValid(getValues(), { setError });
  }

  function onSummaryClick(event) {
    const target = event.target.closest('[data-focus-field]');
    if (target) focusField(target.dataset.focusField);
  }

  form.setAttribute('novalidate', '');
  form.addEventListener('focusout', onFocusOut);
  form.addEventListener('input', onInput);
  form.addEventListener('change', onInput);
  form.addEventListener('submit', onSubmit);
  summary?.addEventListener('click', onSummaryClick);

  return {
    getValues,
    setError,
    destroy() {
      form.removeEventListener('focusout', onFocusOut);
      form.removeEventListener('input', onInput);
      form.removeEventListener('change', onInput);
      form.removeEventListener('submit', onSubmit);
      summary?.removeEventListener('click', onSummaryClick);
    },
  };
}
