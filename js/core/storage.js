/**
 * Camada de acesso ao localStorage.
 *
 * - Prefixa as chaves com namespace + versão, evitando conflito com outros
 *   sites/scripts e permitindo migrar o formato dos dados no futuro.
 * - Serializa/desserializa JSON automaticamente.
 * - Nunca lança exceção: o localStorage pode estar bloqueado (modo privado,
 *   cota excedida, cookies desativados). Nesses casos devolve o valor padrão
 *   ou `false`, e a interface decide como avisar a pessoa.
 */

const NAMESPACE = 'ong-resgate-animal';
const VERSION = 1;

const buildKey = (key) => `${NAMESPACE}:v${VERSION}:${key}`;

export function isStorageAvailable() {
  try {
    const probe = buildKey('__teste__');
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function read(key, fallback = null) {
  try {
    const stored = window.localStorage.getItem(buildKey(key));
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    window.localStorage.setItem(buildKey(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(buildKey(key));
  } catch {
    /* armazenamento indisponível: nada a remover */
  }
}
