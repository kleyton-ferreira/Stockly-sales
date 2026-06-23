import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <div className="m-4 w-full rounded-[10px] bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="">
          <p className="text-sm font-bold text-textGreen-primary">Produtos</p>
          <h2 className="text-xl font-bold">Gestão de Produtos</h2>
        </div>
        <div className="[&_svg]:size-auto">
          <Button variant="destructive">
            <PlusIcon size={20} /> Novo Produto
          </Button>
        </div>
      </div>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductPage;
