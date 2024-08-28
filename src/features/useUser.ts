import { deleteUser, getAllUsers, updateUser } from "@/api/user";
import { displayErrorAlert, displaySuccessAlert } from "@/components/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "users";

const getQuertKeys = (id?: string) => {
  return id ? [RESOURCE, id] : [RESOURCE];
};

// GET ALL USERS
export const useGetUsers = () => {
  return useQuery({
    queryKey: getQuertKeys(),
    queryFn: getAllUsers,
    initialData: []
  });
};

// UPDATE USER
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys() });
      displaySuccessAlert("User details updated!");
    },
    onError: () => {
      displayErrorAlert("Error updating user!");
    }
  });
  return mutation;
};

// DELETE USER
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKeys() });
      displaySuccessAlert("User deleted!");
    },
    onError: () => {
      displayErrorAlert("Error deleting user!");
    }
  });
  return mutation;
};
