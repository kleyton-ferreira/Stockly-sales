import { deleteSale } from "@/app/_actions/product/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

interface SaleTableDropdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProduct">;
  productsOne: ProductDto[];
  prodOptions: ComboboxOption[];
}

const SaleTableDropdownMenu = ({
  sale,
  productsOne,
  prodOptions,
}: SaleTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar venda.");
    },
  });

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de tranferência.");
  };

  const handleConfirmDeleteClick = () => execute({ id: sale.id });

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontalIcon
                size={16}
                className="text-bg-textGreen-primary"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-red-50 p-3">
            <DropdownMenuLabel className="mb-6 font-bold">
              Ações
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/*  BOTAO - 1 */}
            <DropdownMenuItem
              className="mb-6 flex gap-1.5"
              onClick={handleCopyToClipboardClick}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/*  BOTAO - 2 */}
            <SheetTrigger asChild>
              <DropdownMenuItem className="mb-6 flex gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            {/*  BOTAO - 3 */}
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-1.5">
                <TrashIcon size={16} /> Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação nao pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        isOpen={upsertSheetIsOpen}
        saledId={sale.id}
        productOptions={prodOptions}
        products={productsOne}
        onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
        defaultSelectedProducts={sale.saleProduct.map((slProducts) => ({
          id: slProducts.productId,
          quantity: slProducts.quantity,
          name: slProducts.productName,
          price: Number(slProducts.unitPrice),
        }))}
      />
    </Sheet>
  );
};

export default SaleTableDropdownMenu;
