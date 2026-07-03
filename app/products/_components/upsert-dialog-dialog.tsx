"use client";

import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";

import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../_components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/app/_actions/product/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/app/_actions/product/create-product";

interface UpsetProducDialogProps {
  defaultValues?: CreateProductSchema;
  onSuccess?: () => void;
}

const UpsetProducDialog = ({
  onSuccess,
  defaultValues,
}: UpsetProducDialogProps) => {
  const form = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const isEditing = !!defaultValues;

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      await createProduct({ ...data, id: defaultValues?.id });

      onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle> {isEditing ? "Editar" : "Criar"} Produto</DialogTitle>
            <DialogDescription>Informações do produto abaixo</DialogDescription>
          </DialogHeader>

          {/* 1 - INPUT */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o Produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2 - INPUT */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue ?? 0);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 3 - INPUT */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o estoque do produto"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon size={16} className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsetProducDialog;
