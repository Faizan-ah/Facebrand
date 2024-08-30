import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useDeleteUser, useGetUsers } from "@/features/useUser";
import { User } from "@/types/user";
import UpdateUserModal from "./UpdateUserModal";

const UserTable = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    role: ""
  });
  const { data: users, isFetching, isError } = useGetUsers();
  const deleteUser = useDeleteUser();
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Table className="w-9/12 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isFetching &&
            users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="w-56">{user.firstName + " " + user.lastName}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={user.address}>
                  {user.address && user.address.trim() ? user.address : "-"}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>
                  <Button
                    className="mr-2 my-1 w-16"
                    disabled={deleteUser.isPending && deleteUser.variables === user.id}
                    onClick={() => {
                      toggleModal();
                      setCurrentUser(user);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-16"
                    disabled={deleteUser.isPending && deleteUser.variables === user.id}
                    onClick={() => deleteUser.mutate(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isFetching ? (
        <div className="text-center my-2">Loading...</div>
      ) : isError ? (
        <div className="text-center my-2">Error fetching users.</div>
      ) : null}
      <UpdateUserModal open={open} toggleModal={toggleModal} data={currentUser} />
    </div>
  );
};

export default UserTable;
