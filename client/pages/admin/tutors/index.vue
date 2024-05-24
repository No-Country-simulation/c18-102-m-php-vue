<template>
  <NuxtLayout name="admin-layout">
    <div>
      <h2 class="my-5 text-3xl">Apoderados</h2>
      <Table :columns="columns" :data="data" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { columns, Table, type Tutor } from "@/components/tables/tutors";

const data: Tutor[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Ibarra",
    dni: "123456789",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    students: [
      {
        id: 32,
        firstName: "Lautaro",
        lastName: "Ibarra",
        dni: "230456789",
        age: 9,
        course: "2A",
      },
      {
        id: 72,
        firstName: "Mariana",
        lastName: "Ibarra",
        dni: "532913123",
        age: 11,
        course: "3A",
      },
    ],
  },
  {
    id: 2,
    firstName: "Gonzalo",
    lastName: "Gutierrez",
    dni: "123456789",
    email: "gonzagutierrez@example.com",
    phone: "312-456-7890",
    students: [],
  },
];
</script>
