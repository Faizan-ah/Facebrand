import { addToCart, createEmptyCart, getUserCart } from "@/api/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "carts";

const getQuertKeys = () => {
  return [RESOURCE];
};

export const useGetCart = (id: string) => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: () => getUserCart(id),
    initialData: createEmptyCart()
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    }
  });
  return mutation;
};
