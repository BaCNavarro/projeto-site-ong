/**
 * Persistência dos cadastros de colaboradores no localStorage.
 *
 * Guarda duas coisas:
 * - a lista de cadastros concluídos;
 * - o rascunho do formulário, para a pessoa não perder o que digitou
 *   se sair da página ou recarregá-la antes de enviar.
 */
import { read, write, remove } from '../../core/storage.js';

const LIST_KEY = 'cadastros';
const DRAFT_KEY = 'rascunho-cadastro';

const generateId = () =>
  window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function listCadastros() {
  const list = read(LIST_KEY, []);
  return Array.isArray(list) ? list : [];
}

/** Retorna o nome do campo duplicado ('cpf' ou 'email') ou null. */
export function findDuplicate({ cpf, email }) {
  const list = listCadastros();
  if (list.some((item) => item.cpf === cpf)) return 'cpf';
  if (list.some((item) => item.email.toLowerCase() === email.toLowerCase())) return 'email';
  return null;
}

/** Salva o cadastro. Retorna o registro criado ou null se falhar. */
export function saveCadastro(data) {
  const record = {
    id: generateId(),
    ...data,
    email: data.email.toLowerCase(),
    criadoEm: new Date().toISOString(),
  };

  return write(LIST_KEY, [...listCadastros(), record]) ? record : null;
}

export function saveDraft(values) {
  return write(DRAFT_KEY, { values, salvoEm: new Date().toISOString() });
}

export function loadDraft() {
  const draft = read(DRAFT_KEY);
  return draft && typeof draft.values === 'object' ? draft : null;
}

export function clearDraft() {
  remove(DRAFT_KEY);
}
