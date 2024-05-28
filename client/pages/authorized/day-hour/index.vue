<template>
  <div class="lg:h-screen lg:h-[100dvh] py-5 grid place-items-center">
    <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <img :src="schoolInfo.logo" alt="Logo School" class="w-50 h-50 mb-1" />
      <h3 class="uppercase hidden sm:block text-center">
        Registro de datos de autorización
      </h3>
      <div class="flex mx-2 justify-space-around">
        <label for="start">Start date:</label>
        <Input
          type="date"
          value="2018-07-22"
          placeholder="Día retiro"
          class="p-2 rounded text-center"
        />
      </div>
      <div class="flex mx-2 justify-space-around">
        <label for="start">Hora de Retiro:</label>
        <Input
          type="date"
          value="2018-07-22"
          placeholder="Hora retiro"
          class="p-2 rounded text-center"
        />
      </div>
      <Button
        type="button"
        class="cursor-pointer mt-4"
        @click="siguiente(form)"
      >
        Siguiente
      </Button>
      <div class="flex items-center mt-6 w-full justify-between">
        <!-- Step 1 -->
        <div class="flex items-center">
          <div class="relative">
            <div
              class="w-8 h-8 text-base flex items-center justify-center bg-gray-300 text-white rounded-full"
            >
              1
            </div>
            <div
              class="absolute top-1/2 transform -translate-y-1/2 w-20 h-1 bg-gray-300 left-8"
            />
          </div>
          <div class="px-4 text-base pt-8">Step 1</div>
        </div>
        <!-- Step 2 -->
        <div class="flex items-center">
          <div class="relative">
            <div
              class="w-8 h-8 text-base flex items-center justify-center bg-blue-500 text-white rounded-full"
            >
              2
            </div>
            <div
              class="absolute top-1/2 transform -translate-y-1/2 w-20 h-1 bg-blue-500 left-8"
            />
          </div>
          <div class="px-4 text-base pt-8">Step 2</div>
        </div>
        <!-- Step 3 -->
        <div class="flex items-center">
          <div class="relative">
            <div
              class="w-8 h-8 text-base flex items-center justify-center bg-blue-500 text-white rounded-full"
            >
              3
            </div>
          </div>
          <div class="px-4 text-base pt-8">Step 3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Button } from "@/components/ui/button";

const schoolInfo = {
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s",
};
const form = reactive({
  dateDay: "1-1-1111",
  dateTime: "14:00",
});
const siguiente = () => {
  console.table(form);
};
</script>

<style scoped></style>
