import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

interface SalesTableDropdowMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdowMenu = ({
  product,
  onDelete,
}: SalesTableDropdowMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/*  BOTAO - 1 */}
        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopyIcon size={16} />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/*  BOTAO - 2 */}

        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => onDelete(product.id)}
        >
          <TrashIcon size={16} /> Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdowMenu;
