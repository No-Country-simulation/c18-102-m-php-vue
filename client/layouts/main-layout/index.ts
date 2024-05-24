import { type VariantProps, cva } from "class-variance-authority";

export { default as MainLayout } from "./MainLayout.vue";

export const mainLayoutVariants = cva(
  "w-full mx-auto block px-4 md:px-0 md:w-[calc(100%-80px)] lg:w-[calc(100%-120px)]",
  {
    variants: {
      size: {
        sm: "max-w-[900px]",
        md: "max-w-[1280px]",
        lg: "max-w-[1440px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export type MainLayoutVariants = VariantProps<typeof mainLayoutVariants>;
