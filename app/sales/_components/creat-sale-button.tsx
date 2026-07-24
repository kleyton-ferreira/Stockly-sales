"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Sheet, SheetTrigger } from "../../_components/ui/sheet";
import UpsertSheetContent from "./../_components/upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { ProductDto } from "@/app/_data-access/product/get-products";

interface CreatSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const CreatSaleButton = (props: CreatSaleButtonProps) => {
  const [sheetIsopen, setShetIsOpen] = useState(false);
  return (
    <Sheet modal={false} open={sheetIsopen} onOpenChange={setShetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="destructive">
          <PlusIcon /> Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsopen}
        onSubmitSuccess={() => setShetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default CreatSaleButton;
