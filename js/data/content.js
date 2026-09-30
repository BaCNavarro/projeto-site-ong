/**
 * Conteúdo institucional da ONG.
 * Separado da marcação: para alterar textos, valores ou projetos, edite
 * apenas este arquivo — os templates se encarregam da apresentação.
 */

export const ORG = {
  name: 'ONG Resgate Animal',
  whatsappUrl: 'https://wa.me/5531987654321',
};

export const ABOUT_TEXT =
  'Somos um grupo dedicado a transformar a vida de animais em situação de abandono, rua e maus-tratos. Nosso trabalho diário consiste em resgatar cães e gatos em vulnerabilidade, oferecendo um porto seguro onde recebem todos os cuidados veterinários, alimentação adequada, além de reabilitação física e emocional. Mais do que um abrigo temporário, preparamos cada animal para o seu final feliz: encontrar uma família amorosa e consciente. Acreditamos que todo animal merece uma segunda chance e trabalhamos incansavelmente para conectar essas vidas a lares onde serão respeitados, protegidos e amados.';

export const MISSION_TEXT =
  'Resgatar, reabilitar e proteger animais em situação de risco, promovendo a adoção responsável e atuando na conscientização da sociedade sobre o respeito e o bem-estar animal.';

export const VALUES = [
  {
    icon: '💚',
    title: 'Compaixão',
    text: 'Tratamos cada vida com empatia, dignidade e amor incondicional, reconhecendo que cada animal sente e importa.',
  },
  {
    icon: '🔍',
    title: 'Transparência',
    text: 'Agimos com total clareza e honestidade na gestão de recursos, doações e em todas as etapas dos nossos processos de adoção.',
  },
  {
    icon: '🛡️',
    title: 'Responsabilidade',
    text: 'Assumimos um compromisso sério com a segurança e a saúde dos animais que passam pelos nossos cuidados, garantindo que não voltem a sofrer.',
  },
  {
    icon: '📚',
    title: 'Educação',
    text: 'Acreditamos que a verdadeira transformação acontece através da informação, orientando a comunidade sobre a posse responsável e a importância de cuidar de quem não tem voz.',
  },
];

export const HERO_IMAGES = [
  {
    src: new URL('../../img/home/imagem1.jpg', import.meta.url).href,
    alt: 'Dois cães e um gato interagindo amigavelmente deitados em almofadas',
    width: 500,
    height: 333,
  },
  {
    src: new URL('../../img/home/imagem2.jpg', import.meta.url).href,
    alt: 'Dois cães e um gato brincando na porta de casa',
    width: 500,
    height: 375,
  },
];

export const PROJECTS = [
  {
    id: 'castracao',
    icon: '✂️',
    tag: 'Mensal',
    title: 'Castração Solidária',
    description:
      'Programa mensal que oferece castração a baixo custo ou gratuita para animais de famílias carentes e animais de rua, visando o controle populacional e a saúde pública.',
  },
  {
    id: 'feira-adocao',
    icon: '🏠',
    tag: 'Quinzenal',
    title: 'Feira de Adoção "Me Leva pra Casa"',
    description:
      'Eventos quinzenais realizados em praças parceiras na região de Belo Horizonte, onde cães e gatos reabilitados são apresentados a possíveis adotantes após uma rigorosa entrevista.',
    gallery: [
      { src: new URL('../../img/projetos/adocao1.jpg', import.meta.url).href, alt: 'Foto de dois SRD para adoção', width: 500, height: 750 },
      { src: new URL('../../img/projetos/adocao3.jpg', import.meta.url).href, alt: 'Foto de um filhote de gato para adoção', width: 500, height: 333 },
      { src: new URL('../../img/projetos/adocao2.jpg', import.meta.url).href, alt: 'Foto de um SRD para adoção', width: 500, height: 750 },
    ],
    cta: {
      text: 'Deseja saber mais sobre este projeto?',
      label: '💬 Fale conosco pelo WhatsApp',
      variant: 'whatsapp',
    },
  },
  {
    id: 'sos-animal',
    icon: '🚑',
    tag: '24 horas',
    urgent: true,
    title: 'Resgate de Emergência (SOS Animal)',
    description:
      'Uma equipe de prontidão dedicada a atender chamados urgentes de animais atropelados ou em situação de risco iminente, garantindo os primeiros socorros veterinários.',
    cta: {
      text: 'Deseja reportar uma emergência?',
      label: '🚨 Acione o resgate pelo WhatsApp',
      variant: 'danger',
    },
  },
];

export const HELP_OPTIONS = [
  { value: 'voluntario', title: 'Trabalho Voluntário', description: 'Eventos e Limpeza' },
  { value: 'lar_temporario', title: 'Lar Temporário', description: 'Acolha um animal' },
  { value: 'doador', title: 'Doador Mensal', description: 'Contribuição recorrente' },
];

export const BENEFITS = [
  'Você ajuda a resgatar e reabilitar animais em situação de risco.',
  'Contribui para a adoção responsável e para o controle populacional.',
  'Participa de uma rede que promove o respeito e o bem-estar animal.',
];
