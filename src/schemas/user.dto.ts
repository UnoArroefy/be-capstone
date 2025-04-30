export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUser {
  username: string;
  email: string;
  role?: Role;
}
