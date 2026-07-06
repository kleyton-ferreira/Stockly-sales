import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import CreatSaleButton from "./_components/creat-sale-button";

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

        <CreatSaleButton
          products={product}
          productOptions={productOptionsValues}
        />
      </div>
    </div>
  );
};

export default SalesPage;
