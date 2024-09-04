import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, UserUpdate } from "@/types/user";
import { useUpdateUser } from "@/features/useUser";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserSchema: ZodType<UserUpdate> = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+\d{5,}$/, { message: "Invalid phone number format" }),
  email: z.string().email({ message: "Invalid email address." }).nonempty("Email is required")
});

type UpdateUserProps = {
  open: boolean;
  toggleModal: () => void;
  data: User;
};

const UpdateUserModal: React.FC<UpdateUserProps> = ({ open, toggleModal, data }) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: data
  });

  const updateUser = useUpdateUser();

  const onSubmit: SubmitHandler<UserUpdate> = (formData) => {
    const user: User = { ...watch(), ...formData };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-9/12 mt-6">
          <div className="my-3">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="Enter first name.." {...register("firstName")} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Enter last name.." {...register("lastName")} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter address.." {...register("address")} />
          </div>
          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter email.." {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Enter phone number.." {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>
        <Separator className="mb-3 mt-5" />
        <Button type="submit" disabled={updateUser.isPending}>
          Update user
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;
