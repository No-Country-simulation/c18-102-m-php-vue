import type { Student } from "./student";

export interface Tutor {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  students: Student[];
}
