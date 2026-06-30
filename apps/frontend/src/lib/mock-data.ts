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
];
