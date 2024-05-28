<script setup lang="ts">
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { useRouter } from "vue-router";

import { LoaderCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { wait } from "@/lib/utils";

const schoolInfo = {
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s",
};
const mainHeight = ref("lg:h-screen lg:h-[100dvh] ");

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email Requerido" })
      .min(1, { message: "Mínimo un caracter" })
      .email({ message: "Debe ser un email" }),
    password: z
      .string({ required_error: "Contraseña Requerida" })
      .min(3, { message: "Mínimo 3 caracteres" }),
  }),
);

const { isFieldDirty, handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const router = useRouter();

  try {
    await wait(3000);

    router.push("/teacher");
    console.log(values);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <main :class="mainHeight + 'grid place-items-center py-10'">
    <form
      class="flex flex-col items-center gap-5 rounded-3xl bg-white p-10 text-3xl font-normal"
      @submit="onSubmit"
    >
      <img :src="schoolInfo.logo" alt="Logo School" />
      <h1 class="uppercase hidden sm:block text-center">
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
              <Input v-bind="componentField" type="email" placeholder="Email" />
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
        <Button type="submit" :disabled="isSubmitting">
          <template v-if="isSubmitting">
            <LoaderCircle class="w-4 h-4 mr-2 animate-spin" />
            Iniciando Sesión
          </template>
          <template v-else> Iniciar Sesión </template>
        </Button>
        <label
          for="terms"
          class="flex w-full items-center justify-between text-base"
        >
          <p class="select-none">Recordar contraseña</p>
          <Checkbox id="terms" class="" />
        </label>
        <a
          href="/recoverPassword"
          class="mt-5 text-center text-sm text-black underline decoration-2"
          >¿Olvidaste tu contraseña?</a
        >
      </section>
    </form>
  </main>
</template>
