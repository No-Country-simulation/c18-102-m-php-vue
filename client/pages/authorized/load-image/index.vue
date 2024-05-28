<template>
  <NuxtLayout name="main-layout" as="main">
    <div class="lg:h-screen lg:h-[100dvh] py-5 grid place-items-center">
      <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
        <img :src="schoolInfo.logo" alt="Logo School" class="py-3" />
        <h2 class="text-2xl">Registro de datos de autorización</h2>
        <h3 class="text-xl my-3">Subir foto actualizada de autorizado</h3>
        <span class="text-sm mb-3"
          >*evitar lentes, sombreros y mala iluminación</span
        >
        <label
          for="file-upload"
          class="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-64 text-gray-600 hover:bg-gray-100"
        >
          <div class="flex items-center bg-gray-100">
            <div class="bg-gray-100 px-3 py-5 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div class="text-center mx-3 px-3 py-5">
              <p class="text-lg px-3 mt-3">
                Arrastra y suelta tus archivos aquí
              </p>
              <p class="text-gray-500 my-2">o</p>
              <button
                id="file-upload-button"
                class="outline outline-offset-2 outline-gray-300 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-lg mx-2"
                @click="triggerFileInput"
              >
                Selecciona un archivo
              </button>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
        <div v-if="file" class="mt-4 text-gray-700">
          <p>Archivo seleccionado:</p>
          <p class="font-semibold">
            {{ file.name }}
          </p>
          <button class="mt-2 text-red-500" @click="removeFile">
            Eliminar
          </button>
        </div>
        <button
          class="mt-4 bg-gray-300 px-4 py-2 rounded-lg"
          :disabled="!file"
          @click="uploadFile"
        >
          Siguiente
        </button>
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
                class="w-8 h-8 text-base flex items-center justify-center bg-gray-300 text-gray-600 rounded-full"
              >
                3
              </div>
            </div>
            <div class="px-4 text-base pt-8">Step 3</div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const schoolInfo = {
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s",
};
const file = ref<File | null>(null);

const triggerFileInput = () => {
  const input = document.getElementById("file-upload") as HTMLInputElement;
  if (input) {
    input.click();
  }
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    console.log("file.value", file.value);
  }
};

const removeFile = () => {
  file.value = null;
  const input = document.getElementById("file-upload") as HTMLInputElement;
  if (input) {
    input.value = "";
  }
};

const uploadFile = () => {
  if (!file.value) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);

  // Simulate a file upload (you can replace this with your own upload logic)
  console.log("Uploading file:", file.value.name);
  setTimeout(() => {
    alert(`File "${file.value!.name}" uploaded successfully!`);
    file.value = null;
  }, 2000);
};
</script>

<style scoped></style>
