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
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import z from "zod";

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
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    form.reset();
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);

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
                  // onChange={field.onChange}
                  // value={field.value}
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
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell> {formatCurrency(productTotal)} </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
};

export default UpsertSheetContent;
