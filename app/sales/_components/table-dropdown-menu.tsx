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
import { Sale } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface SaleTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SaleTableDropdownMenu = ({ sale }: SaleTableDropdownMenuProps) => {
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
          <DropdownMenuItem className="mb-6 flex gap-1.5">
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>

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
  );
};

export default SaleTableDropdownMenu;
