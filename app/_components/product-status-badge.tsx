import React from "react";
import { Badge } from "./ui/badge";
import { CircleIcon } from "lucide-react";
import { ProductStatus } from "../_data-access/product/get-products";

const getStatusLabel = (status: string) => {
  if (status === "OUT_OF_STOCK") {
    return "Fora de Estoque";
  }

  if (status === "IN_STOCK") {
    return "Em estoque";
  }
};

interface ProductsStatusBadgeProps {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: ProductsStatusBadgeProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      className="gap-1.5"
      variant={label === "Em estoque" ? "default" : "outline"}
    >
      <CircleIcon
        size={10}
        className={
          label === "Em estoque" ? "fill-primary-foreground" : "fill-foreground"
        }
      />
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
