export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};
