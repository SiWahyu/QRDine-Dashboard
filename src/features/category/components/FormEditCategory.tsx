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
import { Check, Loader2, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { CategoryType } from "@/types/category";
import { useRouter } from "next/navigation";
import { useUpdateCategory } from "../hooks/useUpdateCategory";

export function FormEditCategory({ category }: { category: CategoryType }) {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    values: {
      name: category.name,
      is_active: Boolean(category.is_active),
    },
  });

  const updateCategory = useUpdateCategory();

  const onsubmit = (data: CategoryFormValues) => {
    updateCategory.mutate(
      { id: category.id, data },
      {
        onSuccess: () => {
          toast.success("Category updated successfully", {
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
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
        <CardDescription>
          Update the information below to modify this category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-category-form"
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
          onClick={() => router.back()}
          disabled={updateCategory.isPending}
          className="px-6"
        >
          {updateCategory.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <X />
          )}
          Cancel
        </Button>
        <Button
          type="submit"
          form="update-category-form"
          disabled={updateCategory.isPending}
          className="px-6"
        >
          {updateCategory.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Check />
          )}
          {updateCategory.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
