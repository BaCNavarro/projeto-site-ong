/**
 * Notificações temporárias (toasts).
 * Usa a região #toasts do index.html, marcada com aria-live, para que
 * leitores de tela anunciem a mensagem.
 */
import { html, render } from '../core/template.js';

const ICONS = { success: '✓', error: '!', info: 'i' };
const DEFAULT_DURATION = 5000;

export function showToast(message, { type = 'info', duration = DEFAULT_DURATION } = {}) {
  const region = document.getElementById('toasts');
  if (!region) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  render(toast, html`
    <span class="toast__icon" aria-hidden="true">${ICONS[type]}</span>
    <p class="toast__message">${message}</p>
    <button class="toast__close" type="button" aria-label="Fechar notificação">×</button>
  `);

  const dismiss = () => {
    toast.classList.add('toast--leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    // Garante a remoção mesmo sem animação (movimento reduzido)
    setTimeout(() => toast.remove(), 400);
  };

  toast.querySelector('.toast__close').addEventListener('click', dismiss);
  setTimeout(dismiss, duration);
  region.append(toast);
}
