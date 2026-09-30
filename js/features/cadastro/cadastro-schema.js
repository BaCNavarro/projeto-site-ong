/**
 * Esquema do formulário de cadastro: define, em um só lugar, a estrutura
 * (etapas e linhas), a apresentação (rótulos, placeholders, máscaras) e as
 * regras de validação de cada campo.
 *
 * Em `fields` de cada etapa, um array interno agrupa campos na mesma linha.
 */
import { HELP_OPTIONS } from '../../data/content.js';
import {
  required, minLength, fullName, lettersOnly, email, matchesFormat, cpf, phone, cep,
} from '../validation/validators.js';

export const CADASTRO_STEPS = [
  {
    legend: 'Dados Pessoais',
    fields: [
      {
        name: 'nome',
        label: 'Nome Completo',
        placeholder: 'Digite o seu nome completo',
        autocomplete: 'name',
        rules: [
          required('Informe seu nome completo.'),
          minLength(3, 'O nome precisa ter pelo menos 3 letras.'),
          lettersOnly('O nome deve conter apenas letras.'),
          fullName('Informe nome e sobrenome.'),
        ],
      },
      [
        {
          name: 'cpf',
          label: 'CPF',
          placeholder: '000.000.000-00',
          inputmode: 'numeric',
          maxlength: 14,
          mask: 'cpf',
          rules: [
            required('Informe seu CPF.'),
            matchesFormat(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Use o formato 000.000.000-00.'),
            cpf(),
          ],
        },
        {
          name: 'telefone',
          label: 'Telefone (WhatsApp)',
          type: 'tel',
          placeholder: '(00) 00000-0000',
          autocomplete: 'tel',
          maxlength: 15,
          mask: 'phone',
          rules: [
            required('Informe um telefone para contato.'),
            phone('Informe o telefone com DDD, ex.: (31) 98765-4321.'),
          ],
        },
      ],
      {
        name: 'email',
        label: 'E-mail',
        type: 'email',
        placeholder: 'exemplo@email.com',
        autocomplete: 'email',
        rules: [
          required('Informe seu e-mail.'),
          email('Informe um e-mail válido, ex.: nome@email.com.'),
        ],
      },
    ],
  },
  {
    legend: 'Endereço',
    fields: [
      [
        {
          name: 'cep',
          label: 'CEP',
          placeholder: '00000-000',
          inputmode: 'numeric',
          autocomplete: 'postal-code',
          maxlength: 9,
          mask: 'cep',
          rules: [
            required('Informe seu CEP.'),
            cep('O CEP deve ter 8 números, no formato 00000-000.'),
          ],
        },
        {
          name: 'cidade',
          label: 'Cidade',
          placeholder: 'Ex.: Belo Horizonte',
          autocomplete: 'address-level2',
          rules: [
            required('Informe sua cidade.'),
            minLength(2, 'Informe o nome completo da cidade.'),
            lettersOnly('O nome da cidade deve conter apenas letras.'),
          ],
        },
      ],
    ],
  },
  {
    legend: 'Como deseja ajudar?',
    fields: [
      {
        name: 'interesse',
        label: 'Forma de ajuda',
        type: 'choice',
        options: HELP_OPTIONS,
        rules: [required('Escolha uma forma de ajudar.')],
      },
      {
        name: 'consentimento',
        label: 'Autorização',
        type: 'checkbox',
        text: 'Autorizo a ONG Resgate Animal a usar meus dados para entrar em contato sobre voluntariado, adoção e doações.',
        rules: [required('É necessário autorizar o contato para concluir o cadastro.')],
      },
    ],
  },
];

/** Mapa plano { nomeDoCampo: definição }, usado pelo validador. */
export const CADASTRO_FIELDS = Object.fromEntries(
  CADASTRO_STEPS.flatMap((step) => step.fields.flat()).map((field) => [field.name, field]),
);
