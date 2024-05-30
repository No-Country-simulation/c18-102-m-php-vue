<script setup lang="ts">
import * as z from "zod";
import { ErrorMessage, Field } from "vee-validate";
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";

import { AlarmClock, CalendarX2Icon } from "lucide-vue-next";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";

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

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

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
      tutorPhoto: z
        .instanceof(File, { message: "Imágen requerida" })
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "El tamaño del archivo debe ser inferior a 5 MB.")
        .refine((file) => {
          console.log("file", file);

          return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "Sólo se admiten los formatos .jpg y .png"),
    }),
  ),
  toTypedSchema(
    z.object({
      // TODO: validar este campo
      datetime: z.date({
        required_error: "A date of birth is required.",
      }),
    }),
  ),
];

const students = [
  { label: "Sara Rodríguez", value: "1" },
  { label: "Juanito Rodríguez", value: "2" },
  { label: "Pepito Rodríguez", value: "3" },
] as const;

// const countryCodes = [
//   { label: "Chile", value: "+56" },
//   { label: "España", value: "+34" },
//   { label: "Venezuela", value: "+58" },
// ] as const;
const df = new DateFormatter("es-ES", {
  dateStyle: "long",
});

const disabledStudentsSelect = ref(false);
const imageUrl = ref(null);
const EventfileInput = ref(null);

const value = ref<DateValue>();

const emit = defineEmits(["imageloaded"]);

const onSubmit = (formData: FormData) => {
  console.log(JSON.stringify(formData, null, 2));
};

const handleDisableSelect = () => {
  disabledStudentsSelect.value = !disabledStudentsSelect.value;
};

const onEventFilePicked = (event: any) => {
  const files = event.target.files;
  const image = files[0];
  console.log(image);
  const filename = files[0].name;
  if (filename.lastIndexOf(".") <= 0) {
    return alert("Por favor adicione um arquivo válido");
  }
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    imageUrl.value = fileReader.result;
    console.log("setimageUrl", imageUrl.value);
    emit("imageloaded", imageUrl.value);
  });
  fileReader.readAsDataURL(files[0]);
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
        <div class="grid gap-10">
          <div class="relative">
            <div
              class="grid grid-cols-[auto_1fr] mb-4 gap-5 w-full items-center"
            >
              <figure class="w-[100px] h-[100px] rounded-lg">
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="h-full rounded-lg w-full"
                />
                <img
                  v-if="!imageUrl"
                  src="@/assets/images/empty-photo.png"
                  class="h-full rounded-lg w-full"
                />
              </figure>
              <div>
                <Label for="picture" class="flex-col">
                  <p class="mb-3.5 italic font-regular">
                    Sube una imagen cuadrada, con un tamaño inferior a 5MB.
                  </p>
                  <div class="relative">
                    <Field
                      id="tutorPhoto"
                      ref="EventfileInput"
                      class="input border-none !bg-background py-6 h-auto"
                      name="tutorPhoto"
                      type="file"
                      @change="onEventFilePicked"
                    />
                  </div>
                </Label>
              </div>
            </div>
            <ErrorMessage
              name="tutorPhoto"
              class="error-message bottom-0 right-0"
            />
          </div>
        </div>
      </FormStep>

      <!-- Step 3 -->
      <FormStep>
        <!-- <Field v-slot="{ componentField, value }" name="datetime" type="date"> -->
        <div class="grid gap-8 max-w-[425px] mb-20 mx-auto">
          <Popover>
            <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
              <label class="label">Fecha de inicio</label>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal',
                      !value && 'text-muted-foreground',
                    )
                  "
                >
                  <CalendarX2Icon class="mr-2 h-4 w-4" />
                  {{
                    value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Pick a date"
                  }}
                </Button>
              </PopoverTrigger>
            </div>

            <PopoverContent class="w-auto p-0">
              <Calendar v-model="value" mode="datetime" initial-focus />
            </PopoverContent>
          </Popover>
          <Popover>
            <div class="grid lg:grid-cols-[0.6fr_1fr] gap-6 items-center">
              <label class="label">Fecha de inicio</label>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal',
                      !value && 'text-muted-foreground',
                    )
                  "
                >
                  <AlarmClock class="mr-2 h-4 w-4" />
                  {{
                    value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Pick a date"
                  }}
                </Button>
              </PopoverTrigger>
            </div>

            <PopoverContent class="w-auto p-0">
              <Calendar v-model="value" mode="datetime" initial-focus />
            </PopoverContent>
          </Popover>
        </div>

        <!-- </Field> -->
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
