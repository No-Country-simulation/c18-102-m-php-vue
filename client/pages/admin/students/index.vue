<template>
  <NuxtLayout name="admin-layout">
    <div>
      <h2 class="my-5 text-3xl">Estudiantes</h2>
      <Table :columns="columns" :data="data" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { columns, Table, type Student } from "@/components/tables/students";

const data: Student[] = [
  {
    id: 1,
    firstName: "Lautaro",
    lastName: "Ibarra",
    dni: "230456789",
    age: 8,
    course: "2A",
  },
  {
    id: 2,
    firstName: "Sofía",
    lastName: "Osorio",
    dni: "323456789",
    age: 8,
    course: "2B",
  },
  {
    id: 3,
    firstName: "Felipe",
    lastName: "Maidana",
    dni: "853456789",
    age: 7,
    course: "1A",
  },
];
</script>
