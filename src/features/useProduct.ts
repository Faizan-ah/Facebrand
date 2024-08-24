import { createProduct, getAllProducts } from "@/api/products";
import { Product } from "@/types/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "products";

const getQuertKeys = (id?: string) => {
  return id ? [RESOURCE, id] : [RESOURCE];
};
// GET ALL PRODUCTS
export const useGetProduct = (searchQuery = "") => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: getAllProducts,
    select: (data) => {
      if (searchQuery) {
        return data.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return data;
    },
    initialData: []
  });
};

// ADD PRODUCT
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
  return mutation;
};
