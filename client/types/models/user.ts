export const enum RoleEnum {
  AUTHORIZED = "authorized",
  TEACHER = "teacher",
  ADMIN = "admin",
}

export type UserType = {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: Date | null;
  password?: string;
  rememberToken?: string;
  Role?: RoleEnum;
};
