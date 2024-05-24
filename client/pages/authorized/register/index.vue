<script setup lang="ts">
import { ref, reactive } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const schoolInfo = {
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s",
};

const alumnos = ref([
  { value: "Luis Molina", index: "1" },
  { value: "Susy Grandel", index: "2" },
  { value: "Emma Nación", index: "3" },
]);

const codigoPais = ref([
  { value: "Chile", index: "+56" },
  { value: "España", index: "+34" },
  { value: "Venezuela", index: "+58" },
]);
const form = reactive({
  nombreAlumno: "",
  seleccionarTodos: false,
  retiroSinAcompanante: false,
  nombreApellidoAutorizado: "",
  dni: 0,
  codigoPais: "",
  telefono: "",
});
const siguiente = () => {
  console.table(form);
};
</script>

<template>
  <NuxtLayout name="main-layout" as="main">
    <div class="grid place-items-center py-5 lg:h-[100dvh] lg:h-screen">
      <form
        id="form"
        class="flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl bg-white p-10 text-3xl font-normal"
      >
        <img :src="schoolInfo.logo" alt="Logo School" class="w-50 h-50 mb-1" />
        <h3 class="hidden text-center uppercase sm:block">
          Registro de datos de autorización
        </h3>
        <section class="flex w-full flex-col gap-1">
          <div class="grid gap-4">
            <DropdownMenu class="col-span-1">
              <DropdownMenuTrigger as-child>
                <Button variant="outline"> Selecciona un Alumno </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuItem
                  v-for="alumno in alumnos"
                  :key="alumno.value"
                  v-model="form.nombreAlumno"
                >
                  {{ alumno.value }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <svg class="pointer-events-none col-start-1 row-start-1">
              <!-- SVG content here -->
            </svg>
            <label
              for="selectAll"
              class="flex w-full items-center justify-between text-base"
            >
              <p class="select-none">Seleccionar Todos</p>
              <Checkbox id="selectAll" v-model="form.seleccionarTodos" />
            </label>
            <label
              for="retiroSinAcompanante"
              class="flex w-full items-center justify-between text-base"
            >
              <p class="select-none">El alumno se retira sin acompañante</p>
              <Checkbox
                id="retiroSinAcompanante"
                v-model="form.retiroSinAcompanante"
              />
            </label>
            <Input
              v-model="form.nombreApellidoAutorizado"
              type="text"
              placeholder="Nombre y apellido"
              class="rounded p-2 caret-black"
            />
            <Input
              v-model="form.dni"
              type="number"
              placeholder="D.N.I."
              class="rounded p-2"
            />
            <div class="grid grid-cols-3 gap-4">
              <div>
                <h4 class="text-base">Teléfono:</h4>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <DropdownMenu class="col-span-1">
                  <DropdownMenuTrigger as-child>
                    <Button variant="outline" class=""> Open </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="w-56">
                    <DropdownMenuItem
                      v-for="(value, index) in codigoPais"
                      :key="index"
                      v-model="form.codigoPais"
                      :value="value"
                    >
                      {{ value.value }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Input
                  v-model="form.telefono"
                  type="tel"
                  placeholder="Teléfono"
                  class="col-span-2 rounded p-2"
                />
              </div>
            </div>
          </div>
        </section>
        <Button
          type="button"
          class="mt-4 cursor-pointer"
          @click="siguiente(form)"
        >
          Siguiente
        </Button>
        <div class="w-100 mt-6 flex items-center">
          <!-- Step 1 -->
          <div class="flex items-center">
            <div class="relative">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-base text-white"
              >
                1
              </div>
              <div
                class="absolute left-8 top-1/2 h-1 w-20 -translate-y-1/2 transform bg-blue-500"
              />
            </div>
            <div class="px-4 pt-8 text-base">Step 1</div>
          </div>

          <!-- Step 2 -->
          <div class="flex items-center">
            <div>
              <div class="relative">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-base text-gray-600"
                >
                  2
                </div>
                <div
                  class="absolute left-8 top-1/2 h-1 w-20 -translate-y-1/2 transform bg-gray-300"
                />
              </div>
            </div>
            <div class="px-4 pt-8 text-base">Step 2</div>
          </div>

          <!-- Step 3 -->
          <div class="flex items-center">
            <div class="relative">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-base text-gray-600"
              >
                3
              </div>
            </div>
            <div class="px-4 pt-8 text-base">Step 3</div>
          </div>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
