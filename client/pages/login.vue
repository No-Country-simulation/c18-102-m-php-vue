<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormField, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schoolInfo = {
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRJlM7tWbKZYxzdthfmaF9ndkO4CH7peOI95Er9jFgA&s'
}
const mainHeight = ref('lg:h-screen lg:h-[100dvh] ')

const formSchema = toTypedSchema(z.object({
  email: z.string().min(1, { message: 'Es requerido' }).email({ message: 'Debe ser un email' }),
  password: z.string().min(1, { message: 'Es requerido' })
}))
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})
const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
  alert('hola')
})
</script>

<template>
  <main :class="mainHeight + 'py-10 grid place-items-center'">
    <form
      class="bg-white flex flex-col gap-5 items-center p-10 rounded-3xl font-normal text-3xl"
      @submit="onSubmit"
    >
      <img :src="schoolInfo.logo" alt logo="Logo School">
      <h1 class="uppercase hidden sm:block text-center">
        Registro de datos de autorización
      </h1>
      <section class="flex flex-col gap-4">
        <p>Inicio de sesión</p>
        <FormField v-slot="{componentField}" name="email" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormControl>
              <Input v-bind="componentField" type="email" placeholder="Email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{componentField}" name="password" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormControl>
              <Input v-bind="componentField" type="password" placeholder="Contraseña" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit">
          siguiente
        </Button>
        <label
          for="terms"
          class="text-base w-full flex justify-between items-center"
        >
          <p class="select-none">Recordar contraseña</p>
          <Checkbox id="terms" class="" />
        </label>
        <a
          href="/recoverPassword"
          class="text-sm text-black text-center decoration-2 underline mt-5"
        >¿Olvidaste tu contraseña?</a>
      </section>
    </form>
  </main>
</template>
