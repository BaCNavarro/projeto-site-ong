/**
 * Sistema de templates baseado em tagged template literals.
 *
 * - `html`  monta marcação escapando automaticamente todo valor interpolado
 *           (protege contra injeção de HTML/XSS vinda de dados do usuário).
 * - `raw`   marca um trecho como HTML confiável (use apenas com conteúdo fixo).
 * - `attrs` gera atributos a partir de um objeto, ignorando valores vazios.
 * - `render` injeta um template em um elemento do DOM.
 *
 * Exemplo:
 *   render(el, html`<h2>${titulo}</h2><ul>${itens.map((i) => html`<li>${i}</li>`)}</ul>`);
 */

const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

class SafeHTML {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

export function raw(markup) {
  return new SafeHTML(String(markup));
}

function toMarkup(value) {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof SafeHTML) return value.value;
  if (Array.isArray(value)) return value.map(toMarkup).join('');
  return escapeHTML(value);
}

export function html(strings, ...values) {
  const markup = strings.reduce(
    (acc, chunk, i) => acc + chunk + (i < values.length ? toMarkup(values[i]) : ''),
    '',
  );
  return new SafeHTML(markup);
}

export function attrs(map) {
  const markup = Object.entries(map)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => (value === true ? name : `${name}="${escapeHTML(value)}"`))
    .join(' ');
  return raw(markup);
}

export function render(target, template) {
  target.innerHTML = toMarkup(template);
}
