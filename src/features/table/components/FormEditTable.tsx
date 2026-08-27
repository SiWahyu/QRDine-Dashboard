"use client";

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
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
import { TableFormValues, tableSchema } from "../schemas/tableSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Hash, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { TableType } from "@/types/table";
import { useRouter } from "next/navigation";
import { updateTableAction } from "../actions/table-action";

export function FormEditTable({ table }: { table: TableType }) {
  const router = useRouter();

  const form = useForm<TableFormValues>({
    resolver: zodResolver(tableSchema),
    values: {
      number: table.number,
      restaurant_id: 1,
    },
  });

  const onsubmit = async (data: TableFormValues) => {
    const result = await updateTableAction(table.id, data);

    if (!result.success) {
      toast.error(result.message, {
        position: "top-right",
      });
      return;
    }

    toast.success(result.message, {
      position: "top-right",
    });
    router.push("/dashboard/table");
    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Table</CardTitle>
        <CardDescription>
          Update the information below to modify this table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-table-form"
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <div className="grid sm:grid-cols-2">
            <FieldGroup>
              <Controller
                name="number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="number">
                      Number <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Hash className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="number"
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Table number"
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
        </form>
      </CardContent>
      <CardFooter className="justify-start gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={form.formState.isSubmitting}
          className="px-6"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <X />
          )}
          Cancel
        </Button>
        <Button
          type="submit"
          form="update-table-form"
          disabled={form.formState.isSubmitting}
          className="px-6"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Check />
          )}
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
