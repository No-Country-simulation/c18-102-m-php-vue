export const enum RoleEnum {
  AUTHORIZED = "tutor",
  TEACHER = "teacher",
  ADMIN = "admin",
}

export type UserType = {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  role: RoleEnum;
};
