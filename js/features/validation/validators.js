/**
 * Regras de validação reutilizáveis.
 *
 * Cada regra é um objeto { test(valor, todosOsValores) → boolean, message }.
 * As regras de um campo são avaliadas em ordem; a primeira que falhar
 * define a mensagem exibida.
 */

export const onlyDigits = (value) => String(value).replace(/\D/g, '');

export function isValidCPF(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const checkDigit = (length) => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += Number(digits[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
}

export const required = (message = 'Este campo é obrigatório.') => ({
  test: (value) => (typeof value === 'boolean' ? value : String(value).trim().length > 0),
  message,
});

export const minLength = (min, message) => ({
  test: (value) => String(value).trim().length >= min,
  message,
});

export const fullName = (message = 'Informe nome e sobrenome.') => ({
  test: (value) => String(value).trim().split(/\s+/).length >= 2,
  message,
});

export const lettersOnly = (message = 'Use apenas letras.') => ({
  test: (value) => /^[\p{L}\s'.-]+$/u.test(String(value).trim()),
  message,
});

export const email = (message = 'Informe um e-mail válido.') => ({
  test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim()),
  message,
});

export const matchesFormat = (regex, message) => ({
  test: (value) => regex.test(String(value).trim()),
  message,
});

export const cpf = (message = 'CPF inválido. Confira os números digitados.') => ({
  test: isValidCPF,
  message,
});

export const phone = (message = 'Informe um telefone com DDD.') => ({
  test: (value) => {
    const digits = onlyDigits(value);
    return (digits.length === 10 || digits.length === 11) && Number(digits.slice(0, 2)) >= 11;
  },
  message,
});

export const cep = (message = 'Informe um CEP com 8 números.') => ({
  test: (value) => onlyDigits(value).length === 8,
  message,
});
