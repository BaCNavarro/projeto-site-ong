/**
 * Máscaras de digitação: formatam o valor enquanto a pessoa digita,
 * reduzindo erros de formato antes mesmo da validação.
 *
 * Uso no HTML: <input data-mask="cpf|phone|cep">
 */
import { onlyDigits } from './validators.js';

export const MASKS = {
  cpf(value) {
    const d = onlyDigits(value).slice(0, 11);
    return d
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
  },

  phone(value) {
    const d = onlyDigits(value).slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  },

  cep(value) {
    const d = onlyDigits(value).slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  },
};

export function applyMask(input) {
  const mask = MASKS[input.dataset.mask];
  if (mask) input.value = mask(input.value);
}

/** Aplica as máscaras a todos os campos [data-mask] do formulário. */
export function bindMasks(form) {
  const onInput = (event) => {
    if (event.target.matches('[data-mask]')) applyMask(event.target);
  };

  form.addEventListener('input', onInput);
  return () => form.removeEventListener('input', onInput);
}
