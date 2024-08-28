import { createProduct, deleteProduct, getAllProducts, updateProduct } from "@/api/products";
import { displayErrorAlert, displaySuccessAlert } from "@/components/Alert";
import { Product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "products";

const getQuertKeys = (id?: string, searchQuery = "", sortBy = "") => {
  return id ? [RESOURCE, id, { searchQuery, sortBy }] : [RESOURCE, { searchQuery, sortBy }];
};
// GET ALL PRODUCTS
export const useGetProducts = (searchQuery = "", sortBy = "") => {
  return useQuery({
    queryKey: getQuertKeys(undefined, searchQuery, sortBy),
    queryFn: getAllProducts,
    select: (data: Product[]) => {
      let filteredData = data;

      if (searchQuery) {
        filteredData = filteredData.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (sortBy === "ph") {
        filteredData = filteredData.sort((a, b) => b.price - a.price);
      } else if (sortBy === "pl") {
        filteredData = filteredData.sort((a, b) => a.price - b.price);
      } else if (sortBy === "asc") {
        filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "dsc") {
        filteredData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortBy === "tr") {
        filteredData = filteredData.sort((a, b) => b.rating - a.rating);
      }
      return filteredData;
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
      queryClient.invalidateQueries({ queryKey: getQuertKeys(undefined, "", "") });
      displaySuccessAlert("Product added!");
    },
    onError: () => {
      displayErrorAlert("Error adding product!");
    }
  });
  return mutation;
};

// UPDATE PRODUCT
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys(undefined, "", "") });
      displaySuccessAlert("Product updated!");
    },
    onError: () => {
      displayErrorAlert("Error updating product!");
    }
  });
  return mutation;
};

// DELETE PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys(undefined, "", "") });
      displaySuccessAlert("Product deleted!");
    },
    onError: () => {
      displayErrorAlert("Error deleting product!");
    }
  });
  return mutation;
};
