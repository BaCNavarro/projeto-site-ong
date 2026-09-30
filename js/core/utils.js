/** Utilitários genéricos, sem dependência de DOM específico. */

/** Adia a execução até que as chamadas parem por `delay` ms. */
export function debounce(fn, delay) {
  let timer = null;

  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
