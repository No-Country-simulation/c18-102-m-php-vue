import type { ColumnDef } from "@tanstack/vue-table";
import type { Tutor } from "./interfaces/tutor";

export const columns: ColumnDef<Tutor>[] = [
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
];
