export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUser {
  googleId: string;
  username: string;
  email: string;
  role?: Role;
}
