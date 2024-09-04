import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Order } from "@/types/order";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { ORDER_STATUS } from "@/lib/constants";
import { useUpdateOrder } from "@/features/useOrder";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../Loader";

const status = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELLED
];
// Define the Zod schema for the Order type
const OrderSchema = z.object({
  comments: z.string().optional(),
  status: z
    .enum([
      ORDER_STATUS.PENDING,
      ORDER_STATUS.SHIPPED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.CANCELLED
    ])
    .refine((value) => status.includes(value), {
      message: "Invalid status"
    }),
  address: z.string().min(1, { message: "Address is required" })
});

type UpdateOrderProps = {
  open: boolean;
  toggleModal: () => void;
  data: Order;
};

const UpdateOrderModal: React.FC<UpdateOrderProps> = ({ open, toggleModal, data }) => {
  const {
    register,
    reset,
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Order>({
    resolver: zodResolver(OrderSchema),
    defaultValues: data
  });

  const updateOrder = useUpdateOrder();

  const onSubmit: SubmitHandler<Order> = (formData) => {
    const order: Order = { ...watch(), ...formData };
    updateOrder.mutate(order, { onSuccess: toggleModal });
  };

  useEffect(() => {
    open && data ? reset(data) : null;
  }, [open, data, reset]);
  const statusOptions = [
    { label: ORDER_STATUS.PENDING.toLowerCase(), value: ORDER_STATUS.PENDING },
    { label: ORDER_STATUS.SHIPPED.toLowerCase(), value: ORDER_STATUS.SHIPPED },
    { label: ORDER_STATUS.DELIVERED.toLowerCase(), value: ORDER_STATUS.DELIVERED },
    { label: ORDER_STATUS.CANCELLED.toLowerCase(), value: ORDER_STATUS.CANCELLED }
  ];
  return (
    <Modal
      open={open}
      toggleModal={toggleModal}
      modalTitle="Update order details"
      className="w-6/12"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-9/12 mt-6">
          <div className="my-3">
            <Label htmlFor="orderAddress">Address</Label>
            <Input id="orderAddress" placeholder="Enter address.." {...register("address")} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="comments">Comments</Label>
            <Input id="comments" placeholder="Enter comment.." {...register("comments")} />
            {errors.comments && <p className="text-red-500 text-sm">{errors.comments.message}</p>}
          </div>
          <div className="my-3">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("status", value);
                  }}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[1001]">
                    <SelectGroup>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
        </div>
        <Separator className="mb-3 mt-5" />
        <Button type="submit" disabled={updateOrder.isPending}>
          <Loader
            width="20"
            height="20"
            color="white"
            visible={updateOrder.isPending}
            wrapperClass="mr-1 flex justify-center items-center"
          />
          Update order
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateOrderModal;
