export class UserModel {
  id?: number;
  email!: string;
  username!: string;
  roles!: [string];
  password!: string;
  token?: string;
  firstName!: string;
  lastName!: string;
  image!: string;
}
