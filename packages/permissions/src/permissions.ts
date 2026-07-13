export const permissions = {
  questions: {
    create: "questions.create",
    delete: "questions.delete",
    update: "questions.update",
  },
  materials: {
    access: "materials.access",
  },
  forum: {
    access: "forum.access",
  },
} as const;
