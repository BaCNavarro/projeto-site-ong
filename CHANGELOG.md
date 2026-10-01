# Changelog

Todas as mudanças relevantes deste projeto são registradas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o projeto adota o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [1.1.1] - 2026-09-30

Otimização de imagens.

### Adicionado

- Script `npm run images`, que gera as versões WebP das imagens a partir dos originais em `fontes/imagens/` com o sharp (#2).

### Alterado

- Fotos e logotipo agora em WebP, com versões de 320 e 500 px servidas por `srcset` e `sizes` e decodificação assíncrona. As fotos caíram de 1,4 MB para 166 KB (ou 86 KB em telas pequenas) (#2).

## [1.1.0] - 2026-09-30

Melhorias pós-lançamento: acessibilidade de cores, build de produção e documentação.

### Adicionado

- Build de produção com o Vite, que minifica HTML, CSS e JavaScript, e os scripts `npm run dev`, `npm run build` e `npm run preview` (#7).
- Publicação automática no GitHub Pages por GitHub Actions a cada push na `main` (#7).
- Suporte às preferências de alto contraste do sistema (`prefers-contrast: more` e `forced-colors: active`) (#5).
- `CHANGELOG.md` com o histórico de versões do projeto (#1).
- Link do site publicado no GitHub Pages no README.
- Aviso no README de que o site é hipotético e foi feito apenas para fins educacionais.

### Alterado

- Instruções do README para rodar o projeto localmente, agora em passo a passo (clonar, iniciar um servidor e acessar) e com o comando equivalente para Windows.
- README com os comandos do Vite, mantendo a opção de rodar o site sem build (#7).

### Corrigido

- Contraste de links, textos de erro e anel de foco, que agora atendem à WCAG 2.2 nível AA (#5).

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

[Não lançado]: https://github.com/BaCNavarro/projeto-site-ong/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/BaCNavarro/projeto-site-ong/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/BaCNavarro/projeto-site-ong/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/BaCNavarro/projeto-site-ong/releases/tag/v1.0.0
