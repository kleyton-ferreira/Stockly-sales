"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Sheet, SheetTrigger } from "../../_components/ui/sheet";
import UpsertSheetContent from "./../_components/upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreatSaleButtonProps {
  products: Product[];
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
        onSubmitSuccess={() => setShetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default CreatSaleButton;
