"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { CategoryType } from "@/types/category";

type SelectCategoryProps = {
  categories: CategoryType[];
  value: CategoryType | null;
  onChange: (value: number | null) => void;
};

export function SelectCategory({
  categories,
  value,
  onChange,
}: SelectCategoryProps) {
  return (
    <Combobox
      items={categories}
      value={value}
      onValueChange={(category) => {
        onChange(category?.id ?? null);
      }}
      itemToStringLabel={(item) => item.name}
    >
      <ComboboxInput placeholder={"Select category"} showClear />

      <ComboboxContent>
        <ComboboxEmpty>{"No category found."}</ComboboxEmpty>

        <ComboboxList>
          {(item: CategoryType) => (
            <ComboboxItem key={item.id} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
