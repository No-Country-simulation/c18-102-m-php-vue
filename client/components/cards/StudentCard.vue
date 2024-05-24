<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import type { StudentType } from "@/types/models/student";

defineProps<{
  data: StudentType;
}>();
</script>

<template>
  <div class="grid aspect-square p-1 gap-4">
    <div class="grid gap-5 text-center">
      <div class="rounded-md bg-[#1D1B20]/40 px-4 py-2.5 shadow-xl">
        <p class="text-xl font-medium uppercase">
          {{ data.studentName }}
        </p>
      </div>
      <div class="flex items-center justify-between gap-16">
        <p class="text-xl font-medium">Grado:</p>
        <Badge
          variant="secondary"
          class="bg-[#1D1B20]/40 px-5 text-2xl font-bold"
        >
          {{ data.studentGrade }}
        </Badge>
      </div>
    </div>
    <div class="grid gap-3">
      <p class="text-center text-2xl font-medium">Lo retira:</p>
      <figure class="relative mx-auto h-[150px] w-[150px]">
        <img
          src="@/assets/images/student-2.png"
          class="h-full w-full rounded-full object-cover"
          decoding="async"
          loading="lazy"
        />
      </figure>
      <div class="rounded-md bg-[#1D1B20]/20 px-4 py-2.5 text-center shadow-xl">
        <p class="text-xl font-medium uppercase">
          {{ data.authorizedName }}
        </p>
      </div>
    </div>
    <div>
      <div class="mb-3 space-y-1">
        <div class="text-center">
          <p class="text-xl">Contacto autorizado:</p>
          <p class="font-medium">
            {{ data.authorizedContact }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-xl">Contacto apoderado:</p>
          <p class="font-medium">
            {{ data.tutorContact }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 items-center gap-3">
        <Button
          class="rounded-md px-4 py-1 text-lg font-medium uppercase shadow-xl"
        >
          No asistió
        </Button>
        <Button
          class="rounded-md px-4 py-1 text-lg font-medium uppercase shadow-xl"
        >
          Retirado
        </Button>
      </div>
      <DialogClose as-child>
        <Button variant="link" class="mx-auto block w-fit italic underline">
          Ver lista completa
        </Button>
      </DialogClose>
    </div>
  </div>
</template>
