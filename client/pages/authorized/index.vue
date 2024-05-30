<script setup lang="ts">
import * as z from "zod";
import { ErrorMessage, Field, FieldArray } from "vee-validate";
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";

import { FormStep, FormWizard } from "@/components/ui/steps";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Check, ChevronsUpDown } from "lucide-vue-next";

// import { Popover, PopoverTrigger } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
const validationSchema = [
  toTypedSchema(
    z.object({
      // TODO: Crear un array para almacenar todos los id cuando se selecione el checkbox de studentLeavesAlone https://zod.dev/?id=nonempty
      studentFullName: z.string({ required_error: "Este campo es requerido" }),
      studentLeavesAlone: z.boolean().default(false).optional(),
      fullName: z.string({ required_error: "Nombre y Apellido es requerido" }),
      dni: z.string({ required_error: "DNI es requerido" }),
      // TODO: añadir phone code input
      // phoneCode: z.string({ required_error: "Código es requerido" }),
      phoneNumber: z.string({ required_error: "Teléfono es requerido" }),
    }),
  ),
  toTypedSchema(
    z.object({
      password: z.string({ required_error: "Nombre es requerido" }),
      confirmPass: z.string({ required_error: "Nombre es requerido" }),
    }),
  ),
  toTypedSchema(
    z.object({
      password: z.string({ required_error: "Nombre es requerido" }),
      confirmPass: z.string({ required_error: "Nombre es requerido" }),
    }),
  ),
];

const students = [
  { label: "Sara Rodríguez", value: "1" },
  { label: "Juanito Rodríguez", value: "2" },
  { label: "Pepito Rodríguez", value: "3" },
] as const;

const disabledStudentsSelect = ref(false);

// const countryCodes = [
//   { label: "Chile", value: "+56" },
//   { label: "España", value: "+34" },
//   { label: "Venezuela", value: "+58" },
// ] as const;

const onSubmit = (formData: FormData) => {
  console.log(JSON.stringify(formData, null, 2));
};

const handleDisableSelect = () => {
  disabledStudentsSelect.value = !disabledStudentsSelect.value;
};
</script>

<template>
  <NuxtLayout name="main-layout" as="main" class="grid items-center">
    <img
      src="@/assets/images/tutor-background.png"
      class="fixed inset-0 w-full h-full object-cover"
      alt="Background"
    />
    <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
      <!-- Step 1 -->
      <FormStep>
        <div class="grid gap-8 max-w-[425px] mx-auto">
          <Field
            v-slot="{ componentField }"
            name="studentFullName"
            type="select"
          >
            <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
              <label for="studentFullName" class="label">Alumno</label>
              <div class="relative">
                <Select
                  v-bind="componentField"
                  :disabled="disabledStudentsSelect"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar alumno" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup
                      v-for="student in students"
                      :key="student.value"
                      class="p-0"
                    >
                      <SelectItem :value="student.value">
                        {{ student.label }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage name="studentFullName" class="error-message" />
              </div>
            </div>
          </Field>

          <div class="grid gap-4">
            <div
              class="grid grid-cols-[1fr_auto] gap-4 lg:gap-20 items-center w-full justify-between"
            >
              <label for="selectAllStudents" class="label">
                Seleccionar todos
              </label>
              <Checkbox id="selectAllStudents" @click="handleDisableSelect" />
            </div>

            <Field
              v-slot="{ value, handleChange }"
              name="studentLeavesAlone"
              type="checkbox"
              :value="true"
              :unchecked-value="false"
            >
              <div
                class="grid grid-cols-[1fr_auto] gap-4 lg:gap-20 items-center w-full justify-between"
              >
                <label for="studentLeavesAlone" class="label">
                  El alumno se retira sin acompañante
                </label>
                <Checkbox
                  id="studentLeavesAlone"
                  :checked="value"
                  @update:checked="handleChange"
                />
              </div>
            </Field>
          </div>
          <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
            <label for="fullName" class="label">Nombre y apellido</label>
            <div class="relative">
              <Field
                id="fullName"
                name="fullName"
                class="input"
                placeholder="Nombre Completo"
              />
              <ErrorMessage name="fullName" class="error-message" />
            </div>
          </div>

          <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
            <label for="dni" class="label">D.N.I</label>
            <div class="relative">
              <Field
                id="dni"
                class="input"
                name="dni"
                type="text"
                placeholder="D.N.I"
              />
              <ErrorMessage name="dni" class="error-message" />
            </div>
          </div>

          <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
            <label for="dni" class="label">Teléfono</label>
            <div class="relative">
              <!-- <Field id="phoneCode" as="div" name="phoneCode" type="text">
                <Popover>
                  <PopoverTrigger as-child>
                    <div>
                      <Button
                        variant="outline"
                        role="combobox"
                        :class="
                          cn(
                            'justify-between w-full',
                            !values.language && 'text-muted-foreground',
                          )
                        "
                      >
                        {{
                          values.language
                            ? countryCodes.find(
                                (language) =>
                                  language.value === values.language,
                              )?.value
                            : "+0"
                        }}
                        <ChevronsUpDown
                          class="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent class="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar país..." />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="language in countryCodes"
                            :key="language.value"
                            class="gap-2"
                            :value="language.label"
                            @select="
                              () => {
                                setFieldValue('language', language.value);
                              }
                            "
                          >
                            <div
                              class="flex items-center w-full justify-between"
                            >
                              <span>{{ language.label }}</span>
                              <span>{{ language.value }}</span>
                            </div>
                            <Check
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  language.value === values.language
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Field> -->
              <Field
                id="phoneNumber"
                class="input"
                name="phoneNumber"
                type="text"
                placeholder="555 555-1234"
              />
              <ErrorMessage name="phoneNumber" class="error-message" />
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Step 2 -->
      <FormStep>
        <div class="grid grid-cols-[auto_1fr] gap-5 w-full items-center">
          <figure class="w-[100px] h-[100px] rounded-lg">
            <img src="@/assets/images/empty-photo.png" />
          </figure>
          <div>
            <Label for="picture" class="grid grid-">
              <p class="mb-2.5 italic font-regular">
                Sube una imagen cuadrada, con un tamaño inferior a 5MB.
              </p>
              <Input id="picture" type="file" />
            </Label>
          </div>
        </div>
      </FormStep>

      <!-- Step 3 -->
      <FormStep>
        <label for="password" class="input">Password</label>
        <FieldArray id="password" name="password" type="password" />
        <ErrorMessage name="password" />

        <label for="confirmation" class="input">Confirm Password</label>
        <Field id="confirmation" name="confirmPassword" type="password" />
        <ErrorMessage name="confirmPassword" />
      </FormStep>
    </FormWizard>
  </NuxtLayout>
</template>

<style scoped>
.input {
  @apply flex h-[46px] w-full rounded-md border-2 border-input bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50;
}

.input:hover {
  @apply border-black;
}

.input:focus-visible {
  @apply border-black outline-none shadow-xl;
}

.input::placeholder {
  @apply text-muted-foreground;
}

.label {
  @apply text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
}

.error-message {
  @apply text-destructive text-sm font-medium absolute mt-1;
}
</style>
