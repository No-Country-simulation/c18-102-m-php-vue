<template>
  <div v-if="shouldShow">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

// This is a ref injected from FormWizard
// clones the step index to get the step's index and advances it by 1 for the next step
// meaning each step gets a index id starting from 1
const currentIdx = inject("STEP_COUNTER").value++;
// Grabs the live ref to the current form active step
const formStepIdx = inject("CURRENT_STEP_INDEX");

// If this step should be shown
const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>
