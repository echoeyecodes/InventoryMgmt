"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";

interface UseFormWithValidatorProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues: UseFormProps<T>["defaultValues"];
  shouldFocusError?: boolean;
}

export default function useFormWithValidator<T extends FieldValues>({
  schema,
  defaultValues,
  shouldFocusError = true,
}: UseFormWithValidatorProps<T>): UseFormReturn<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    shouldFocusError,
  });

  return form;
}
