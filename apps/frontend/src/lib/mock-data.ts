export type Question = {
  id: string;
  title: string;
  source: string;
  subject: string;
  content: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  correct: boolean;
  content: string;
};

export const questions: Question[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet",
    source: "Lorem University",
    subject: "Lorem Studies",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " +
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. " +
      "Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    answers: [
      {
        id: "1",
        correct: false,
        content: "Lorem ipsum dolor sit amet.",
      },
      {
        id: "2",
        correct: false,
        content: "Consectetur adipiscing elit.",
      },
      {
        id: "3",
        correct: true,
        content: "Sed do eiusmod tempor incididunt.",
      },
      {
        id: "4",
        correct: false,
        content: "Ut enim ad minim veniam.",
      },
    ],
  },
  {
    id: "2",
    title: "Dolor sit amet consectetur",
    source: "Ipsum Institute",
    subject: "Placeholder Science",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " +
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. " +
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. " +
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    answers: [
      {
        id: "1",
        correct: true,
        content: "Duis aute irure dolor in reprehenderit.",
      },
      {
        id: "2",
        correct: false,
        content: "Excepteur sint occaecat cupidatat non proident.",
      },
      {
        id: "3",
        correct: false,
        content: "Sunt in culpa qui officia deserunt.",
      },
      {
        id: "4",
        correct: false,
        content: "Mollit anim id est laborum.",
      },
    ],
  },
  {
    id: "3",
    title: "Equação do Segundo Grau",
    source: "Universidade Exemplo",
    subject: "Matemática",
    content: `
Considere a equação

$$
x^2 - 5x + 6 = 0.
$$

Para resolvê-la, podemos utilizar a **fórmula de Bhaskara**:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.
$$

Neste caso, temos:

| Coeficiente | Valor |
| ------------ | ----: |
| $a$ | $1$ |
| $b$ | $-5$ |
| $c$ | $6$ |

Como o discriminante é

$$
\\Delta = b^2 - 4ac = (-5)^2 - 4(1)(6) = 1,
$$

a equação possui **duas raízes reais distintas**.

### Observações

- O coeficiente $a$ deve ser diferente de zero.
- Se $\\Delta > 0$, existem duas raízes reais.
- Se $\\Delta = 0$, existe uma raiz real dupla.
- Se $\\Delta < 0$, não existem raízes reais.

> Dica: sempre calcule o discriminante antes de aplicar a fórmula.
`,
    answers: [
      {
        id: "1",
        correct: false,
        content: "$x = 1$ e $x = 6$",
      },
      {
        id: "2",
        correct: true,
        content: "$x = 2$ e $x = 3$",
      },
      {
        id: "3",
        correct: false,
        content: "$x = -2$ e $x = -3$",
      },
      {
        id: "4",
        correct: false,
        content: "A equação **não possui raízes reais**.",
      },
    ],
  },
  {
    id: "4",
    title: "Análise de Dados",
    source: "Instituto Nacional de Estatística",
    subject: "Estatística",
    content: `
Uma pesquisa foi realizada com **100 estudantes** para identificar o meio de transporte utilizado para chegar à escola.

| Transporte | Frequência |
| --------- | ---------: |
| Ônibus | 45 |
| Carro | 25 |
| Bicicleta | 20 |
| A pé | 10 |

A frequência relativa de cada categoria pode ser calculada por

$$
f_r = \\frac{f_i}{N},
$$

em que:

- $f_i$ é a frequência da categoria;
- $N$ é o total de observações.

Assim, para quem utiliza ônibus,

$$
f_r = \\frac{45}{100} = 0{,}45 = 45\\%.
$$

### Considere as afirmações

- A categoria mais frequente é **Ônibus**.
- A soma das frequências é igual a **100**.
- As frequências relativas totalizam **100%**.
`,
    answers: [
      {
        id: "1",
        correct: true,
        content: "**45%** dos estudantes utilizam ônibus.",
      },
      {
        id: "2",
        correct: false,
        content: "**25%** dos estudantes vão a pé.",
      },
      {
        id: "3",
        correct: false,
        content: "A soma das frequências é **90**.",
      },
      {
        id: "4",
        correct: false,
        content: "A bicicleta é o meio de transporte mais utilizado.",
      },
    ],
  },
];
