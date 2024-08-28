import { deleteOrder, getAllOrders, updateOrder } from "@/api/order";
import { displayErrorAlert, displaySuccessAlert } from "@/components/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "orders";

const getQuertKeys = () => {
  return [RESOURCE];
};

// GET ALL ORDERS
export const useGetOrders = () => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: getAllOrders,
    initialData: []
  });
};

// UPDATE ORDER
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys() });
      displaySuccessAlert("Order updated!");
    },
    onError: () => {
      displayErrorAlert("Error updating order!");
    }
  });
  return mutation;
};

// DELETE ORDER
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys() });
      displaySuccessAlert("Order deleted!");
    },
    onError: () => {
      displayErrorAlert("Error deleting order!");
    }
  });
  return mutation;
};
