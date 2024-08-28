import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { Controller, useForm } from "react-hook-form";
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

type UpdateOrderProps = {
  open: boolean;
  toggleModal: () => void;
  data: Order;
};

const UpdateOrderModal: React.FC<UpdateOrderProps> = ({ open, toggleModal, data }) => {
  const { register, watch, reset, setValue, control } = useForm<Order>({
    defaultValues: data
  });

  const updateOrder = useUpdateOrder();
  const handleUpdateOrder = () => {
    const order: Order = { ...watch() };
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
      <div className="w-full md:w-9/12 mt-6">
        <div className="my-3">
          <Label htmlFor="orderAddress">Address</Label>
          <Input id="orderAddress" placeholder="Enter address.." {...register("address")} />
        </div>
        <div className="my-3">
          <Label htmlFor="comments">Comments</Label>
          <Input id="comments" placeholder="Enter comment.." {...register("comments")} />
        </div>
        <div className="my-3">
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
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
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <Button onClick={handleUpdateOrder} disabled={updateOrder.isPending}>
        Update order
      </Button>
    </Modal>
  );
};

export default UpdateOrderModal;
