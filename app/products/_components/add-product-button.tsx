"use client";

import { useState } from "react";

import { Button } from "@/app/_components/ui/button";

import { PlusIcon } from "lucide-react";

import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import UpsetProducDialog from "./upset-dialog-dialog";

const AddproductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <PlusIcon size={20} /> Novo Produto
        </Button>
      </DialogTrigger>
      <UpsetProducDialog onSuccess={() => setDialogIsOpen(false)} />
    </Dialog>
  );
};

export default AddproductButton;
