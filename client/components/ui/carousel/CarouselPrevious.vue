<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

import type { WithClassAsProps } from "./interface";
import { useCarousel } from "./useCarousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="
      cn(
        'touch-manipulation absolute h-8 w-8 rounded-full p-0',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeft class="h-10 w-10 text-current" />
    </slot>
  </Button>
</template>
