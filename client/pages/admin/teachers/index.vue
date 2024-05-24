<template>
  <NuxtLayout name="admin-layout">
    <div>
      <h2 class="my-5 text-3xl">Maestros</h2>
      <Table :columns="columns" :data="data" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { columns, Table, type Teacher } from "@/components/tables/teachers";

const data: Teacher[] = [
  {
    id: 1,
    firstName: "Mariana",
    lastName: "Martinez",
    email: "marianamartinez@example.com",
    dni: "123456789",
    phone: "123-456-7890",
    course: "2A",
  },
  {
    id: 2,
    firstName: "Jorge",
    lastName: "Olivera",
    email: "jorgeolivera@example.com",
    dni: "323456789",
    phone: "123-456-7890",
    course: "2B",
  },
  {
    id: 3,
    firstName: "Eugenia",
    lastName: "Hernandez",
    email: "eugeniahernandez@example.com",
    dni: "66456789",
    phone: "123-456-7890",
    course: "1A",
  },
];
</script>
