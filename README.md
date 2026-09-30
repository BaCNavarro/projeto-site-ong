# ONG Resgate Animal

Site institucional da **ONG Resgate Animal**, dedicada ao resgate, reabilitação e adoção responsável de cães e gatos em Belo Horizonte.

## Funcionalidades

- **Início:** apresentação da ONG, missão e valores
- **Nossos Projetos:** iniciativas solidárias mantidas pela ONG
- **Seja um Colaborador:** formulário de cadastro em etapas, com máscaras (CPF, telefone, CEP), validação em tempo real e salvamento no navegador (localStorage)
- Layout responsivo com menu mobile
- Acessibilidade: link "pular para o conteúdo", foco gerenciado na troca de páginas, notificações anunciadas por leitores de tela
- Páginas de erro e 404

## Tecnologias

HTML5, CSS3 e JavaScript puro (módulos ES), sem dependências nem etapa de build. A navegação é uma SPA com roteamento por hash (`#/rota`), que funciona em qualquer hospedagem estática, inclusive no GitHub Pages.

## Como rodar localmente

Os navegadores bloqueiam módulos JavaScript quando o arquivo é aberto diretamente (`file://`), então use um servidor local:

```bash
python3 -m http.server
```

Depois acesse <http://localhost:8000>. Outra opção é a extensão **Live Server** do VS Code.

## Estrutura

```
index.html          página única da SPA (cabeçalho, rodapé e área dinâmica)
css/style.css       estilos
js/main.js          ponto de entrada
js/routes.js        tabela de rotas
js/core/            template, roteador, storage e utilitários
js/data/            conteúdo institucional (textos, projetos, valores)
js/components/      templates reutilizáveis
js/views/           uma view por página
js/features/        cadastro e validação de formulários
js/ui/              navegação e notificações
```

Para alterar textos, valores ou projetos, edite apenas `js/data/content.js`.
