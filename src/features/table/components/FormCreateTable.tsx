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
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Hash, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { TableFormValues, tableSchema } from "../schemas/tableSchema";
import { useCreateTable } from "../hooks/useCreateTable";
import { useRouter } from "next/navigation";

export function FormCreateTable() {
  const router = useRouter();

  const form = useForm<TableFormValues>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      number: "",
      restaurant_id: 1,
    },
  });

  const createTable = useCreateTable();

  const onsubmit = (data: TableFormValues) => {
    createTable.mutate(data, {
      onSuccess: () => {
        toast.success("Table created successfully", {
          position: "top-right",
        });
        router.push("/dashboard/table");
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
        <CardTitle>Table details</CardTitle>
        <CardDescription>
          Fill in the information below to create a new table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-table-form"
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
          onClick={() => form.reset()}
          disabled={createTable.isPending}
          className="px-6"
        >
          {createTable.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <RotateCcw />
          )}
          Reset
        </Button>
        <Button
          type="submit"
          form="create-table-form"
          disabled={createTable.isPending}
          className="px-6"
        >
          {createTable.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Check />
          )}
          {createTable.isPending ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
