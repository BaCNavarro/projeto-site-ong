/**
 * Ponto de entrada da aplicação.
 *
 * Organização dos módulos:
 *   core/       infraestrutura genérica (templates, roteador, storage, utils)
 *   data/       conteúdo institucional
 *   components/ templates reutilizáveis de interface
 *   views/      páginas da SPA (uma por rota)
 *   features/   funcionalidades com regra de negócio (cadastro, validação)
 *   ui/         comportamentos globais de interface (navegação, toasts)
 */
import { createRouter } from './core/router.js';
import { routes, notFound, renderError } from './routes.js';
import { initNavigation, setActiveLink, closeMobileMenu, focusViewHeading } from './ui/navigation.js';
import { ORG } from './data/content.js';

const outlet = document.getElementById('conteudo');

initNavigation();

const router = createRouter({
  outlet,
  routes,
  fallback: notFound,
  errorView: renderError,
  onNavigate({ path, view, initial, scrollY }) {
    document.title = `${view.title} | ${ORG.name}`;
    setActiveLink(path);
    closeMobileMenu();

    // Nas trocas de rota, vai ao topo (ou à posição em que a pessoa estava,
    // ao voltar/avançar) e anuncia a nova página movendo o foco.
    if (!initial) {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      focusViewHeading(outlet);
    }
  },
});

router.start();
