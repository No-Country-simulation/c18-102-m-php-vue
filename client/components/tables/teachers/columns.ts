import type { ColumnDef } from "@tanstack/vue-table";
import type { Teacher } from "./interfaces/teacher";

export const columns: ColumnDef<Teacher>[] = [
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
    accessorKey: "email",
    header: "Correo electronico",
  },
  {
    accessorKey: "phone",
    header: "N° Telefono",
  },
  {
    accessorKey: "course",
    header: () => h("div", { class: "text-center" }, "Curso"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.getValue("course")),
  },
];
