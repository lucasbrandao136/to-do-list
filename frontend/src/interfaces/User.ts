export interface IUser {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  displayName: string;
  birthday: string;
  photoFile?: File | null;
  registeredAt?: Date;
  enabledAt?: boolean;
}
