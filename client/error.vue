<script setup lang="ts">
import { Button } from "@/components/ui/button";

const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>

<template>
  <NuxtLayout name="main-layout" as="main" size="sm">
    <div class="py-16 grid justify-center">
      <template v-if="error?.statusCode === 404">
        <h1 class="text-5xl font-bold mb-4 text-center">404!</h1>
        <p class="text-2xl font-medium text-center">Esta página no existe.</p>
      </template>
      <template v-else>
        <h1 class="text-5xl font-bold text-center">Dang</h1>
        <p class="text-2xl font-medium text-center">
          <strong>{{ error?.message }}</strong>
        </p>
        <p>It looks like something broke.</p>
        <p>Sorry about that.</p>
      </template>
      <Button class="mt-10" @click="handleError"> Regresa al Inicio </Button>
    </div>
  </NuxtLayout>
</template>
