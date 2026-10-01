/**
 * Gera as versões WebP das imagens do site a partir dos originais em
 * fontes/imagens/. Rode com `npm run images` sempre que trocar uma foto.
 *
 * - Fotos (home e projetos): {nome}-320.webp e {nome}-500.webp em img/<pasta>/.
 * - Logotipo: logo/logotipo.webp com 320 px de largura.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const FONTES = join(ROOT, 'fontes/imagens');
const WEBP = { quality: 80, effort: 6 };
const LARGURAS_FOTOS = [320, 500];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function gerar(origem, destino, largura) {
  const { size } = await sharp(origem)
    .resize({ width: largura, withoutEnlargement: true })
    .webp(WEBP)
    .toFile(destino);
  console.log(`${relative(ROOT, destino).padEnd(32)} ${kb(size).padStart(9)}`);
}

async function fotos(pasta) {
  const entrada = join(FONTES, pasta);
  const saida = join(ROOT, 'img', pasta);
  await mkdir(saida, { recursive: true });

  for (const arquivo of (await readdir(entrada)).sort()) {
    if (!/\.jpe?g$/i.test(arquivo)) continue;
    const nome = basename(arquivo, extname(arquivo));
    for (const largura of LARGURAS_FOTOS) {
      await gerar(join(entrada, arquivo), join(saida, `${nome}-${largura}.webp`), largura);
    }
  }
}

await fotos('home');
await fotos('projetos');

const logo = join(FONTES, 'logo/logotipo.jpeg');
await mkdir(join(ROOT, 'logo'), { recursive: true });
await gerar(logo, join(ROOT, 'logo/logotipo.webp'), 320);
