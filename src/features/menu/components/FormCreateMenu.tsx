"use client";

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldDescription,
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
import { Button, buttonVariants } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, RotateCcw, Tag, Upload, X } from "lucide-react";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { SelectCategory } from "./SelectCategory";
import {
  CreateMenuFormInput,
  CreateMenuFormOutput,
  createMenuSchema,
} from "../schemas/menuSchema";
import { useRouter } from "next/navigation";
import { createMenuAction } from "../actions/menu-action";
import { CategoryType } from "@/types/category";

export function FormCreateMenu({ categories }: { categories: CategoryType[] }) {
  const router = useRouter();

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  const form = useForm<CreateMenuFormInput, unknown, CreateMenuFormOutput>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      name: "",
      is_available: true,
      price: "",
      image: [],
      description: "",
      category_id: null,
    },
  });

  const onsubmit = async (data: CreateMenuFormOutput) => {
    const result = await createMenuAction(data);

    if (!result.success) {
      toast.error(result.message, {
        position: "top-right",
      });
      return;
    }

    toast.success(result.message, {
      position: "top-right",
    });
    router.push("/dashboard/menu");
    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Menu details</CardTitle>
        <CardDescription>
          Fill in the information below to create a new menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-menu-form"
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <div className="grid md:grid-cols-2 gap-6">
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
                        placeholder="Menu name"
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
            <FieldGroup>
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">
                      Price <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Rp
                      </span>

                      <Input
                        value={
                          field.value
                            ? new Intl.NumberFormat("id-ID").format(
                                Number(field.value),
                              )
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        className="h-10 pl-9"
                        placeholder="0"
                        autoComplete="off"
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
          <div className="grid grid-cols-2 gap-6">
            <Controller
              name="category_id"
              control={form.control}
              render={({ field, fieldState }) => {
                const selectedCategory =
                  categories?.find((category) => category.id === field.value) ??
                  null;
                return (
                  <Field>
                    <SelectCategory
                      categories={categories ?? []}
                      onChange={field.onChange}
                      value={selectedCategory}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <Controller
            name="is_available"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Available</FieldLabel>

                <RadioGroup
                  value={field.value ? "available" : "unavailable"}
                  onValueChange={(value) =>
                    field.onChange(value === "available")
                  }
                  className="grid max-w-xs grid-cols-2 gap-0 rounded-lg bg-muted p-1"
                >
                  <FieldLabel
                    htmlFor="available"
                    className="w-full cursor-pointer justify-center rounded-md py-1.5 text-sm font-normal text-muted-foreground transition-all has-data-checked:bg-background has-data-checked:text-foreground has-data-checked:font-medium has-data-checked:shadow-sm has-data-checked:ring-1 has-data-checked:ring-border has-[>[data-slot=radio-group-item]:focus-visible]:ring-2 has-[>[data-slot=radio-group-item]:focus-visible]:ring-ring/50"
                  >
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Available
                    <RadioGroupItem
                      value="available"
                      id="available"
                      className="sr-only"
                    />
                  </FieldLabel>

                  <FieldLabel
                    htmlFor="unavailable"
                    className="w-full cursor-pointer justify-center rounded-md py-1.5 text-sm font-normal text-muted-foreground transition-all has-data-checked:bg-background has-data-checked:text-foreground has-data-checked:font-medium has-data-checked:shadow-sm has-data-checked:ring-1 has-data-checked:ring-border has-[>[data-slot=radio-group-item]:focus-visible]:ring-2 has-[>[data-slot=radio-group-item]:focus-visible]:ring-ring/50"
                  >
                    <span className="size-2 rounded-full bg-muted-foreground" />
                    Unavailable
                    <RadioGroupItem
                      value="unavailable"
                      id="unavailable"
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
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FieldGroup>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>Description of the menu.</FieldDescription>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Enter description."
                    className="p-4 h-32"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </FieldGroup>
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Image <span className="text-destructive">*</span>
                </FieldLabel>

                <FileUpload
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  className="w-full"
                  value={field.value}
                  onValueChange={field.onChange}
                  onFileReject={onFileReject}
                >
                  <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-2 text-center py-4">
                      <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                      </div>

                      <p className="font-medium text-sm">
                        Drag & drop file here
                      </p>

                      <p className="text-muted-foreground text-xs">
                        Or click to browse (max 1 file, up to 5MB)
                      </p>
                    </div>

                    <FileUploadTrigger
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "mt-2 w-fit",
                      )}
                    >
                      Browse file
                    </FileUploadTrigger>
                  </FileUploadDropzone>

                  <FileUploadList>
                    {field.value?.map((file: File, index: number) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />

                        <FileUploadItemDelete
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "icon",
                            }),
                            "size-7",
                          )}
                        >
                          <X className="size-4" />
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
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
          disabled={form.formState.isSubmitting}
          className="px-6"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <RotateCcw />
          )}
          Reset
        </Button>
        <Button
          type="submit"
          form="create-menu-form"
          disabled={form.formState.isSubmitting}
          className="px-6"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Check />
          )}
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
