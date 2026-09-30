/** View: Início (#/) */
import { html } from '../core/template.js';
import { ABOUT_TEXT, MISSION_TEXT, VALUES, HERO_IMAGES } from '../data/content.js';
import { valueCard, image } from '../components/common.js';

export default {
  title: 'Início',

  render: () => html`
    <section class="hero">
      <div class="container grid-12 hero__inner">
        <div class="col-lg-6">
          <span class="eyebrow animate-in">Reabilitação • Adoção • Proteção</span>
          <h2 class="hero__title animate-in animate-in--delay-1" data-view-heading>Todo animal merece uma <em>segunda chance</em>.</h2>
          <p class="hero__text animate-in animate-in--delay-2">Resgatamos cães e gatos em situação de abandono e maus-tratos e os preparamos para encontrar uma família amorosa e consciente.</p>
          <div class="hero__actions animate-in animate-in--delay-3">
            <a class="btn btn--primary" href="#/cadastro">Quero ajudar</a>
            <a class="btn btn--outline" href="#/projetos">Conheça os projetos</a>
          </div>
        </div>

        <div class="hero__gallery col-md-8 col-md-start-3 col-lg-6 col-lg-start-7">
          ${HERO_IMAGES.map((img) => image(img))}
        </div>
      </div>
    </section>

    <section id="quem-somos" class="section">
      <div class="container">
        <div class="section__header reveal">
          <span class="eyebrow">Sobre nós</span>
          <h2>Quem somos?</h2>
          <p class="lead">${ABOUT_TEXT}</p>
        </div>
      </div>
    </section>

    <section id="missao-valores" class="section section--alt">
      <div class="container">
        <div class="section__header section__header--center reveal">
          <span class="eyebrow">Propósito</span>
          <h2>Nossa missão e nossos valores</h2>
        </div>

        <div class="mission reveal">
          <h3 class="mission__title">Missão</h3>
          <p class="mission__text">${MISSION_TEXT}</p>
        </div>

        <h3 class="visually-hidden">Valores</h3>
        <ul class="values grid-12">
          ${VALUES.map(valueCard)}
        </ul>
      </div>
    </section>

    <section class="cta-band">
      <div class="container reveal">
        <h2 class="cta-band__title">Faça parte dessa história</h2>
        <p class="cta-band__text">Seja voluntário, lar temporário ou doador mensal.</p>
        <a class="btn btn--light" href="#/cadastro">Seja um Colaborador</a>
      </div>
    </section>
  `,
};
