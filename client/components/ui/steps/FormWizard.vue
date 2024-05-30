<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref, computed, provide, defineEmits } from "vue";
import { Button } from "@/components/ui/button";

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["submit"]);
const currentStepIdx = ref(0);

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0);
provide("STEP_COUNTER", stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide("CURRENT_STEP_INDEX", currentStepIdx);

// if this is the last step
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

// If the `previous` button should appear
const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

// extracts the indivdual step schema
const currentSchema = computed(() => {
  return props.validationSchema[currentStepIdx.value];
});

const { handleSubmit, isValidating } = useForm({
  // vee-validate will be aware of computed schema changes
  validationSchema: currentSchema,
  // turn this on so each step values won't get removed when you move back or to the next step
  keepValuesOnUnmount: true,
});

// We are using the "submit" handler to progress to next steps
// and to submit the form if its the last step
const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;

    return;
  }

  // Let the parent know the form was filled across all steps
  emit("submit", values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }

  currentStepIdx.value--;
}
</script>

<template>
  <form
    class="my-6 z-10 relative grid gap-10 px-8 lg:px-16 py-8 ml-auto max-w-[700px] w-full bg-card rounded-2xl shadow-lg"
    @submit="onSubmit"
  >
    <div class="grid gap-8 place-items-center">
      <figure class="bg-background py-3 px-10 rounded-xl">
        <img
          src="@/assets/images/logo-form.png"
          alt="Logo School"
          class="w-[84px] mx-auto h-[84px] rounded-xl"
        />
      </figure>
      <h3 class="text-center uppercase text-2xl font-semibold">
        Registro de datos de autorización
      </h3>
    </div>

    <slot />

    <div class="w-full flex flex-col md:flex-row gap-4 justify-center">
      <Button
        v-if="hasPrevious"
        variant="blue"
        size="lg"
        class="px-12"
        type="button"
        @click="goToPrev"
      >
        Anterior
      </Button>
      <Button
        size="lg"
        variant="blue"
        class="px-12"
        type="submit"
        :disabled="isValidating"
        >{{ isLastStep ? "Finalizar" : "Siguiente" }}</Button
      >
    </div>

    <!-- <pre>{{ values }}</pre> -->
  </form>
</template>
