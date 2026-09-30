/** Tabela de rotas da SPA: caminho do hash → view. */
import home from './views/home.js';
import projetos from './views/projetos.js';
import cadastro from './views/cadastro.js';
import naoEncontrada from './views/nao-encontrada.js';
import erro from './views/erro.js';

export const routes = {
  '/': home,
  '/projetos': projetos,
  '/cadastro': cadastro,
};

export const notFound = naoEncontrada;
export const renderError = erro;
