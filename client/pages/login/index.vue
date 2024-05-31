<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import { LoaderCircle } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginReq } from "@/types/queries";
import { useAuthStore } from "@/store/useAuthStore";

const schoolInfo = {
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s",
};
const mainHeight = "lg:h-screen lg:h-[100dvh] ";

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email Requerido" })
      .min(1, { message: "Mínimo un caracter" })
      .email({ message: "Debe ser un email" }),
    password: z
      .string({ required_error: "Contraseña Requerida" })
      .min(3, { message: "Mínimo 3 caracteres" }),
    rememberPassword: z.boolean().default(false).optional(),
  }),
);

const { isFieldDirty, handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (req: LoginReq) => {
  const { login } = useAuthStore();

  try {
    await login(req, !!req.rememberPassword);
  } catch (err: unknown) {
    toast.error((err as Error).message);
  }
});
</script>

<template>
  <NuxtLayout
    name="main-layout"
    :is-required="false"
    class="w-full h-screen flex justify-center md:justify-end"
  >
    <div
      class="absolute right-0 top-0 -z-10 w-full h-full bg-[#3E5A85] sm:bg-emerald-500"
    >
      <img
        src="/bg-img/login.jpg"
        alt=""
        class="h-screen w-full object-cover hidden sm:block opacity-85"
      />
    </div>
    <main :class="mainHeight + 'grid place-items-center py-10'">
      <form
        class="flex flex-col items-center gap-5 rounded-3xl bg-white p-10 text-3xl font-normal"
        @submit="onSubmit"
      >
        <img :src="schoolInfo.logo" />
        <h1 class="hidden text-center uppercase sm:block">
          Registro de datos de autorización
        </h1>
        <section class="flex flex-col gap-4">
          <p>Inicio de sesión</p>
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="email"
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="password"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="password"
                  placeholder="Contraseña"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" :disabled="isSubmitting" class="bg-[#00635D]">
            <template v-if="isSubmitting">
              <LoaderCircle class="w-4 h-4 mr-2 animate-spin" />
              Iniciando Sesión
            </template>
            <template v-else> Iniciar Sesión </template>
          </Button>
          <FormField
            v-slot="{ value, handleChange }"
            type="checkbox"
            name="rememberPassword"
          >
            <label
              for="rememberPassword"
              class="flex w-full items-center justify-between text-base"
            >
              <p class="select-none">Recordar contraseña</p>
              <Checkbox
                id="rememberPassword"
                :checked="value"
                class="data-[state=checked]:bg-[#00635D]"
                @update:checked="handleChange"
              />
            </label>
          </FormField>
          <a
            href="/recoverPassword"
            class="mt-5 text-center text-sm text-black underline decoration-2"
            >¿Olvidaste tu contraseña?</a
          >
        </section>
      </form>
    </main>
  </NuxtLayout>
</template>

<style>
body,
#__nuxt {
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}
</style>
