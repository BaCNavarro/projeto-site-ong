/**
 * Controlador do fluxo de cadastro: liga o formulário às máscaras, à
 * validação e ao armazenamento, e alterna entre formulário e confirmação.
 */
import { render } from '../../core/template.js';
import { isStorageAvailable } from '../../core/storage.js';
import { debounce } from '../../core/utils.js';
import { bindMasks } from '../validation/masks.js';
import { createFormValidator } from '../validation/form-validator.js';
import { showToast } from '../../ui/toast.js';
import { CADASTRO_FIELDS } from './cadastro-schema.js';
import { cadastroForm, cadastroSuccess } from './cadastro-templates.js';
import {
  listCadastros, findDuplicate, saveCadastro, saveDraft, loadDraft, clearDraft,
} from './cadastro-repository.js';

const DRAFT_SAVE_DELAY = 400;
// O consentimento é pedido novamente a cada visita; não entra no rascunho
const DRAFT_EXCLUDED_FIELDS = ['consentimento'];

const DUPLICATE_MESSAGES = {
  cpf: 'Este CPF já possui cadastro neste navegador.',
  email: 'Este e-mail já possui cadastro neste navegador.',
};

function collectDraft(form) {
  const values = {};
  Object.keys(CADASTRO_FIELDS)
    .filter((name) => !DRAFT_EXCLUDED_FIELDS.includes(name))
    .forEach((name) => {
      const control = form.elements.namedItem(name);
      if (control) values[name] = control.value;
    });
  return values;
}

/** Preenche o formulário com o rascunho salvo. Retorna true se havia dados. */
function restoreDraft(form) {
  const draft = loadDraft();
  if (!draft) return false;

  let restored = false;
  Object.entries(draft.values).forEach(([name, value]) => {
    const control = form.elements.namedItem(name);
    if (!control || !value) return;
    control.value = value; // em RadioNodeList, marca a opção com esse valor
    restored = true;
  });
  return restored;
}

export function mountCadastro(slot) {
  let teardownForm = null;
  const storageOk = isStorageAvailable();

  function showForm() {
    teardownForm?.();
    render(slot, cadastroForm());

    const form = slot.querySelector('#form-cadastro');
    const notice = form.querySelector('[data-draft-notice]');

    const unbindMasks = bindMasks(form);
    notice.hidden = !restoreDraft(form);

    const validator = createFormValidator(form, {
      fields: CADASTRO_FIELDS,
      onValid: (values, { setError }) => submit(values, setError),
    });

    const persistDraft = debounce(() => saveDraft(collectDraft(form)), DRAFT_SAVE_DELAY);
    form.addEventListener('input', persistDraft);
    form.addEventListener('change', persistDraft);

    teardownForm = () => {
      persistDraft.cancel();
      form.removeEventListener('input', persistDraft);
      form.removeEventListener('change', persistDraft);
      validator.destroy();
      unbindMasks();
      teardownForm = null;
    };
  }

  function showSuccess(record) {
    teardownForm?.();
    render(slot, cadastroSuccess(record, listCadastros().length));
    slot.querySelector('[data-success]')?.focus();
  }

  function submit(values, setError) {
    const duplicate = findDuplicate(values);
    if (duplicate) {
      setError(duplicate, DUPLICATE_MESSAGES[duplicate]);
      return;
    }

    const record = saveCadastro(values);
    if (!record) {
      showToast(
        'Não foi possível salvar o cadastro. Verifique se o armazenamento do navegador está habilitado.',
        { type: 'error' },
      );
      return;
    }

    clearDraft();
    showSuccess(record);
    showToast('Cadastro realizado com sucesso!', { type: 'success' });
  }

  function discardDraft() {
    clearDraft();
    showForm();
    slot.querySelector('.form__input')?.focus();
  }

  function onAction(event) {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'descartar-rascunho') discardDraft();
    if (action === 'novo-cadastro') {
      showForm();
      slot.querySelector('.form__input')?.focus();
    }
  }

  slot.addEventListener('click', onAction);
  showForm();

  if (!storageOk) {
    showToast('O armazenamento do navegador está desativado: o rascunho e o cadastro não poderão ser salvos.', {
      type: 'error',
      duration: 8000,
    });
  }

  return () => {
    teardownForm?.();
    slot.removeEventListener('click', onAction);
  };
}
