"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableFooter,
  TableCaption,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/ currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import z from "zod";
import SalesTableDropdowMenu from "./ table-dropdow-menu";
import { CreateSale } from "@/app/_actions/product/sale/create-sale";
import { toast } from "sonner";

const formSchema = z.object({
  productId: z.string().min(1, "O produto é obrigatório.").uuid(),
  quantity: z.coerce
    .number({
      required_error: "A quantidade é obrigatória.",
    })
    .int("A quantidade deve ser um número inteiro.")
    .positive("A quantidade deve ser maior que zero."),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find((prod) => prod.id === data.productId);
    if (!selectedProduct) return;

    // CODIGO COMPLEXO
    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOuOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOuOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((prod) => {
          if (prod.id === selectedProduct.id) {
            return {
              ...prod,
              quantity: prod.quantity + data.quantity,
            };
          }
          return prod;
        });
      }

      const productIsOuOfStock = data.quantity > selectedProduct.stock;
      if (productIsOuOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);

  const handleDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((prod) => prod.id !== productId);
    });
  };

  const onSubmitSales = async () => {
    try {
      await CreateSale({
        products: selectedProducts.map((prod) => ({
          id: prod.id,
          quantity: prod.quantity,
        })),
      });
      toast.success("Venda realizada com sucesso.");
      onSubmitSuccess();
    } catch (error) {
      toast.error("Erro ao realizada uma venda.");
    }
  };

  return (
    <SheetContent className="!max-w-[600px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as Informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <Combobox
                  placeholder="Selecione um produto"
                  options={productOptions}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qunatidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full gap-2" variant="destructive" type="submit">
            <PlusIcon size={20} /> Adicionar produto à venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((productItens) => (
            <TableRow key={productItens.id}>
              <TableCell>{productItens.name}</TableCell>
              <TableCell>{formatCurrency(productItens.price)}</TableCell>
              <TableCell>{productItens.quantity}</TableCell>
              <TableCell>
                {formatCurrency(productItens.price * productItens.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropdowMenu
                  product={productItens}
                  onDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell> {formatCurrency(productTotal)} </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="mt-4">
        <Button
          className="w-full"
          variant="destructive"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSales}
        >
          <CheckIcon size={20} /> Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
