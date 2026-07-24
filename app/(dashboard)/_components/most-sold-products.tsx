import MostsoldProductItem from "./most-sold-product";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";

const MostSoldProducts = async () => {
  const mostSoldProducts = await getMostSoldProducts();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="mb-4 text-lg font-bold text-[#00A180]">
        Produtos mais vendidos
      </p>
      <div className="space-y-2 overflow-auto">
        {mostSoldProducts.map((prodItem) => (
          <MostsoldProductItem key={prodItem.productId} product={prodItem} />
        ))}
      </div>
    </div>
  );
};

export default MostSoldProducts;
