"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

const getStatusLabel = (product: Product) => {
  if (product.stock === 0) {
    return "Fora de Estoque";
  }

  if (product.status === "IN_STOCK") {
    return "Em estoque";
  }
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product);
      return (
        <Badge
          className="gap-1.5"
          variant={label === "Em estoque" ? "default" : "outline"}
        >
          <CircleIcon
            size={10}
            className={
              label === "Em estoque"
                ? "fill-primary-foreground"
                : "fill-foreground"
            }
          />
          {label}
        </Badge>
      );
    },
  },
];
