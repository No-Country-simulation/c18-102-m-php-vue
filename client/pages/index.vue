<script setup lang="ts">
import { Button } from "@/components/ui/button";

// Redirecionar al login por el momento
const router = useRouter();

router.push("/login");
</script>

<template>
  <NuxtLayout name="main-layout" as="main">
    <div>
      <Button variant="default"> Click </Button>
    </div>
  </NuxtLayout>
</template>
