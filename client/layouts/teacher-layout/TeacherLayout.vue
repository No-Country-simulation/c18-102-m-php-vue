<template>
  <header class="sticky left-0 top-0 h-[40px] w-full bg-[#D9D9D9] shadow-md">
    <NuxtLayout name="main-layout"> </NuxtLayout>
  </header>
  <NuxtLayout name="main-layout" as="main">
    <slot />
  </NuxtLayout>
</template>
