import { addToCart, createEmptyCart, getUserCart } from "@/api/cart";
import { displayErrorAlert } from "@/components/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "cart";

const getQuertKeys = () => {
  return [RESOURCE];
};

export const useGetCart = (id: string, options = {}) => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: () => getUserCart(id),
    initialData: createEmptyCart(),
    enabled: !!id,
    ...options
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys() });
    },
    onError: () => {
      displayErrorAlert("Error updating cart!");
    }
  });
  return mutation;
};
