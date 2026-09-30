# Changelog

Todas as mudanças relevantes deste projeto são registradas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o projeto adota o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- `CHANGELOG.md` com o histórico de versões do projeto (#1).
- Link do site publicado no GitHub Pages no README.
- Aviso no README de que o site é hipotético e foi feito apenas para fins educacionais.

### Alterado

- Instruções do README para rodar o projeto localmente, agora em passo a passo (clonar, iniciar um servidor e acessar) e com o comando equivalente para Windows.

## [1.0.0] - 2026-09-30

Primeira versão estável do site da ONG Resgate Animal, publicada no GitHub Pages.

### Adicionado

- Estrutura inicial do projeto, com imagens, logotipo e favicon.
- Utilitários de template com escape de HTML, armazenamento no navegador (localStorage) e funções auxiliares.
- Roteador de SPA baseado em hash (`#/rota`), com restauração da rolagem e transições entre páginas.
- Design system e layout responsivo.
- Menu de navegação para celular e notificações (toasts) anunciadas por leitores de tela.
- Página Início com o conteúdo institucional: apresentação, missão e valores.
- Página Nossos Projetos.
- Validadores, máscaras de CPF, telefone e CEP e validador de formulário com mensagens em tempo real.
- Página Seja um Colaborador, com formulário de cadastro em etapas, rascunho automático e cadastros salvos no navegador.
- Tabela de rotas, tela de erro e página 404.
- README com a descrição do projeto e as instruções para rodar localmente.

### Corrigido

- As URLs antigas (`projetos.html` e `cadastro.html`) agora redirecionam para as rotas equivalentes da SPA.

[Não lançado]: https://github.com/BaCNavarro/projeto-site-ong/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/BaCNavarro/projeto-site-ong/releases/tag/v1.0.0
