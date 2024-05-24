import type { UserType } from "./user";

export enum StudentStatusEnum {
  WITHDRAWN = "Retirado",
  NO_WITHDRAWN = "No Retirado",
  NO_ATTEND = "No Asistió",
}

export type StudentType = {
  id: number;
  studentName: string;
  studentPhoto: string;
  studentContact: string;
  studentGrade: string;
  studentStatus: StudentStatusEnum;
  authorizedName: string;
  authorizedContact: string;
  tutorContact: string;
} & UserType;
