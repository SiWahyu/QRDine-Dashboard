"use client";

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { CategoryFormValues, categorySchema } from "../schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, RotateCcw, Tag } from "lucide-react";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormCreateCategory() {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      is_active: true,
    },
  });

  const createCategory = useCreateCategory();

  const onsubmit = (data: CategoryFormValues) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully", {
          position: "top-right",
        });
        router.push("/dashboard/category");
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-right",
        });
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category details</CardTitle>
        <CardDescription>
          Fill in the information below to create a new category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-category-form"
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <div className="grid sm:grid-cols-2">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Tag className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Category name"
                        autoComplete="off"
                        className="h-10 pl-9"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <Controller
            name="is_active"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Status</FieldLabel>

                <RadioGroup
                  value={field.value ? "active" : "inactive"}
                  onValueChange={(value) => field.onChange(value === "active")}
                  className="grid max-w-xs grid-cols-2 gap-0 rounded-lg bg-muted p-1"
                >
                  <FieldLabel
                    htmlFor="active"
                    className="w-full cursor-pointer justify-center rounded-md py-1.5 text-sm font-normal text-muted-foreground transition-all has-data-checked:bg-background has-data-checked:text-foreground has-data-checked:font-medium has-data-checked:shadow-sm has-data-checked:ring-1 has-data-checked:ring-border has-[>[data-slot=radio-group-item]:focus-visible]:ring-2 has-[>[data-slot=radio-group-item]:focus-visible]:ring-ring/50"
                  >
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Active
                    <RadioGroupItem
                      value="active"
                      id="active"
                      className="sr-only"
                    />
                  </FieldLabel>

                  <FieldLabel
                    htmlFor="inactive"
                    className="w-full cursor-pointer justify-center rounded-md py-1.5 text-sm font-normal text-muted-foreground transition-all has-data-checked:bg-background has-data-checked:text-foreground has-data-checked:font-medium has-data-checked:shadow-sm has-data-checked:ring-1 has-data-checked:ring-border has-[>[data-slot=radio-group-item]:focus-visible]:ring-2 has-[>[data-slot=radio-group-item]:focus-visible]:ring-ring/50"
                  >
                    <span className="size-2 rounded-full bg-muted-foreground" />
                    Inactive
                    <RadioGroupItem
                      value="inactive"
                      id="inactive"
                      className="sr-only"
                    />
                  </FieldLabel>
                </RadioGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="justify-start gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          disabled={createCategory.isPending}
          className="px-6"
        >
          {createCategory.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <RotateCcw />
          )}
          Reset
        </Button>
        <Button
          type="submit"
          form="create-category-form"
          disabled={createCategory.isPending}
          className="px-6"
        >
          {createCategory.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Check />
          )}
          {createCategory.isPending ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
