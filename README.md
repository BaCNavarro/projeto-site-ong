# ONG Resgate Animal

Site institucional da **ONG Resgate Animal**, dedicada ao resgate, reabilitação e adoção responsável de cães e gatos em Belo Horizonte.

> **Aviso:** este é um projeto hipotético, desenvolvido apenas para fins educacionais. A ONG Resgate Animal não existe, e os nomes, contatos, projetos e demais informações do site são fictícios. Os dados preenchidos no formulário ficam somente no navegador de quem o preencheu e não são enviados a ninguém.

## Funcionalidades

- **Início:** apresentação da ONG, missão e valores
- **Nossos Projetos:** iniciativas solidárias mantidas pela ONG
- **Seja um Colaborador:** formulário de cadastro em etapas, com máscaras (CPF, telefone, CEP), validação em tempo real e salvamento no navegador (localStorage)
- Layout responsivo com menu mobile
- Acessibilidade: link "pular para o conteúdo", foco gerenciado na troca de páginas, notificações anunciadas por leitores de tela
- Páginas de erro e 404

## Tecnologias

HTML5, CSS3 e JavaScript puro (módulos ES), sem dependências em tempo de execução. A navegação é uma SPA com roteamento por hash (`#/rota`), que funciona em qualquer hospedagem estática, inclusive no GitHub Pages.

O build de produção usa o [Vite](https://vite.dev/) (esbuild para minificar JS e CSS e `html-minifier-terser` para o HTML). O build é opcional: o código-fonte roda direto no navegador, sem compilação.

## Acesse online

O site está publicado no GitHub Pages: <https://bacnavarro.github.io/projeto-site-ong/>

Cada push na branch `main` dispara o workflow [`deploy.yml`](.github/workflows/deploy.yml), que gera o build com o Vite e publica a pasta `dist/`.

## Como rodar localmente

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/BaCNavarro/projeto-site-ong.git
cd projeto-site-ong
```

### Com Vite (recomendado)

Requer o [Node.js](https://nodejs.org/) 18 ou superior.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Use os scripts:

   | Comando | O que faz |
   |---|---|
   | `npm run dev` | servidor de desenvolvimento com recarga automática em <http://localhost:5173> |
   | `npm run build` | gera a versão de produção, minificada, na pasta `dist/` |
   | `npm run preview` | serve a pasta `dist/` em <http://localhost:4173> para conferir o build |

### Sem build

O código-fonte também roda direto, sem Node.js e sem instalar nada. Basta um servidor estático na raiz do projeto. Os navegadores bloqueiam módulos JavaScript quando o `index.html` é aberto diretamente (`file://`), então abrir o arquivo com dois cliques não funciona:

```bash
python3 -m http.server 8000
```

No Windows, use `py -m http.server 8000`. Depois acesse <http://localhost:8000>.

Outra opção é abrir a pasta no VS Code e usar a extensão **Live Server** ("Open with Live Server" no `index.html`).

## Estrutura

```
index.html          página única da SPA (cabeçalho, rodapé e área dinâmica)
vite.config.js      configuração do build de produção
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

## Histórico de versões

As mudanças de cada versão estão registradas no [CHANGELOG](CHANGELOG.md).
