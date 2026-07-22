import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostsoldProductItemProps {
  product: MostSoldProductDto;
}

const MostsoldProductItem = ({ product }: MostsoldProductItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[4px] pt-6">
        <ProductStatusBadge status={product.status} />
        <h2 className="font-semibold"> {product.name} </h2>
        <p className="font-medium text-slate-500">
          {formatCurrency(Number(product.price))}
        </p>
      </div>
      <div>
        <p className="px-6 text-sm font-semibold">
          {product.totalRevenue} vendido(s)
        </p>
      </div>
    </div>
  );
};

export default MostsoldProductItem;
