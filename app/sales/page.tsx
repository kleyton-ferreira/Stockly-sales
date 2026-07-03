import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

const SalesPage = async () => {
  const product = await getProducts();
  const productOptionsValues: ComboboxOption[] = product.map((prod) => ({
    label: prod.name,
    value: prod.id,
  }));
  return (
    <div className="w-full p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="">
          <p className="text-sm font-bold text-textGreen-primary">Vendas</p>
          <h2 className="text-xl font-bold">Gestão de Vendas</h2>
        </div>
        <div className="[&_svg]:size-auto"></div>

        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button variant="destructive">
              <PlusIcon /> Nova venda
            </Button>
          </SheetTrigger>
          <UpsertSheetContent
            products={product}
            productOptions={productOptionsValues}
          />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
