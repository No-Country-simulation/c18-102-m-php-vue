<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { Primitive, type PrimitiveProps } from "radix-vue";

import { type MainLayoutVariants, mainLayoutVariants } from ".";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  size?: MainLayoutVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  size: "lg",
  class: "",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(mainLayoutVariants({ size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
