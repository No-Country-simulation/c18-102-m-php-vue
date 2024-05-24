import type { ColumnDef } from "@tanstack/vue-table";
import type { Student } from "./interfaces/student";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "dni",
    header: "N° Documento",
  },
  {
    accessorKey: "age",
    header: () => h("div", { class: "text-center" }, "Edad"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("age")),
  },
  {
    accessorKey: "course",
    header: () => h("div", { class: "text-center" }, "Curso"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.getValue("course")),
  },
];
