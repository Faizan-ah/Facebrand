import { deleteUser, getAllUsers, loginUser, registerUser, updateUser } from "@/api/user";
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

// LOGIN USER
export const useLoginUser = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      if (error.message.toLocaleLowerCase().includes("bad credentials")) {
        displayErrorAlert("Invalid credentials!");
      } else {
        displayErrorAlert("Error logging in!");
      }
    }
  });
  return mutation;
};

// LOGIN USER
export const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      if (error.message) {
        displayErrorAlert(error.message);
        return;
      }
      displayErrorAlert("Error with registering, try again later!");
    }
  });
  return mutation;
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
