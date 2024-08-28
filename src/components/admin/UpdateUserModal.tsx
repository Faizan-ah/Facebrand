import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { User } from "@/types/user";
import { useUpdateUser } from "@/features/useUser";

type UpdateUserProps = {
  open: boolean;
  toggleModal: () => void;
  data: User;
};

const UpdateUserModal: React.FC<UpdateUserProps> = ({ open, toggleModal, data }) => {
  const { register, watch, reset } = useForm<User>({
    defaultValues: data
  });

  const updateUser = useUpdateUser();
  const handleUpdateUser = () => {
    const user: User = { ...watch() };
    updateUser.mutate(user, { onSuccess: toggleModal });
  };

  useEffect(() => {
    open && data ? reset(data) : null;
  }, [open, data, reset]);

  return (
    <Modal
      open={open}
      toggleModal={toggleModal}
      modalTitle="Update user details"
      className="w-6/12"
    >
      <div className="w-full md:w-9/12 mt-6">
        <div className="my-3">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" placeholder="Enter first name.." {...register("firstName")} />
        </div>
        <div className="my-3">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Enter last name.." {...register("lastName")} />
        </div>
        <div className="my-3">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter address.." {...register("address")} />
        </div>
        <div className="my-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter email.." {...register("email")} />
        </div>
        <div className="my-3">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Enter phone number.." {...register("phoneNumber")} />
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <Button onClick={handleUpdateUser} disabled={updateUser.isPending}>
        Update user
      </Button>
    </Modal>
  );
};

export default UpdateUserModal;
