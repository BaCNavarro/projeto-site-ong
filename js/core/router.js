/**
 * Roteador SPA baseado em hash (#/rota).
 *
 * O hash funciona em qualquer hospedagem estática sem configuração de
 * servidor. Hashes que não começam com "#/" são tratados como âncoras
 * comuns e ignorados.
 *
 * Cada view é um objeto { title, render(), mount?(root) }:
 *   render() → template da página
 *   mount()  → liga eventos; pode devolver uma função de limpeza
 *
 * Se uma view lançar erro ao renderizar ou montar, `errorView` é exibida
 * no lugar, em vez de deixar a tela em branco.
 *
 * O roteador também guarda a posição de rolagem de cada entrada do
 * histórico: `onNavigate` recebe `scrollY` com 0 em navegações novas e a
 * posição anterior ao voltar/avançar.
 */
import { render } from './template.js';

const DEFAULT_PATH = '/';
const STATE_KEY = 'routerEntry';

const isRouteHash = (hash) => hash === '' || hash === '#' || hash.startsWith('#/');

function normalizePath(hash) {
  const path = hash.replace(/^#/, '').replace(/\/+$/, '');
  return path || DEFAULT_PATH;
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createRouter({ outlet, routes, fallback, errorView, onNavigate }) {
  let currentPath = null;
  let cleanup = null;
  let isInitial = true;

  // Identifica cada entrada do histórico para lembrar sua rolagem. O prefixo
  // evita colisão com chaves gravadas antes de um recarregamento da página.
  const sessionId = Date.now();
  const scrollPositions = new Map();
  let entryCount = 0;
  let entryKey = null;

  /** Sincroniza com a entrada atual do histórico e devolve sua rolagem salva. */
  function syncHistoryEntry() {
    const known = window.history.state?.[STATE_KEY];
    if (known !== undefined) {
      entryKey = known;
      return scrollPositions.get(known) ?? 0;
    }

    entryKey = `${sessionId}-${entryCount++}`;
    window.history.replaceState({ ...window.history.state, [STATE_KEY]: entryKey }, '');
    return 0;
  }

  function resolve(path) {
    return { path, view: routes[path] ?? fallback };
  }

  function runCleanup() {
    const previous = cleanup;
    cleanup = null;
    if (typeof previous !== 'function') return;

    try {
      previous();
    } catch (error) {
      console.error('Erro ao desmontar a página anterior:', error);
    }
  }

  function swap({ path, view, scrollY }) {
    runCleanup();

    let shown = view;
    try {
      render(outlet, view.render());
      cleanup = view.mount?.(outlet) ?? null;
    } catch (error) {
      console.error(`Erro ao exibir a rota "${path}":`, error);
      if (!errorView) throw error;
      shown = errorView;
      render(outlet, errorView.render());
    }

    onNavigate?.({ path, view: shown, initial: isInitial, scrollY });
    isInitial = false;
  }

  function transition(next) {
    // Registra o destino já, e não ao fim da animação: navegações rápidas
    // em sequência (ex.: ir e voltar) sempre terminam na rota do endereço
    currentPath = next.path;

    // View Transitions API: navegação fluida com animação nativa do navegador
    if (!isInitial && document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(() => swap(next));
    } else {
      swap(next);
    }
  }

  function handleHashChange() {
    if (!isRouteHash(window.location.hash)) return;

    // Guarda a rolagem da página que está saindo antes de trocar de entrada
    scrollPositions.set(entryKey, window.scrollY);
    const scrollY = syncHistoryEntry();

    const path = normalizePath(window.location.hash);
    if (path === currentPath) return;

    transition({ ...resolve(path), scrollY });
  }

  return {
    start() {
      // A rolagem passa a ser restaurada pelo roteador, depois de renderizar
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
      window.addEventListener('hashchange', handleHashChange);

      const initialPath = isRouteHash(window.location.hash)
        ? normalizePath(window.location.hash)
        : DEFAULT_PATH;
      transition({ ...resolve(initialPath), scrollY: syncHistoryEntry() });
    },

    navigate(path) {
      window.location.hash = `#${path}`;
    },
  };
}
