import { createProduct, getAllProducts } from "@/api/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "products";

const getQuertKeys = (id?: string) => {
  return id ? [RESOURCE, id] : [RESOURCE];
};
// GET ALL PRODUCTS
export const useGetProduct = () => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: getAllProducts,
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
