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
import { useDeleteOrder, useGetOrders } from "@/features/useOrder";
import { Order } from "@/types/order";
import UpdateOrderModal from "./UpdateOrderModal";
import { convertArrayTimestampToDateTimeFormat } from "@/lib/dateUtility";
import { ORDER_STATUS } from "@/lib/constants";

const OrderTable = () => {
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order>({
    id: "",
    userId: "",
    address: "",
    comments: "",
    dateTime: [],
    status: "",
    products: []
  });
  const { data: orders, isFetching, isError } = useGetOrders();
  const deleteOrder = useDeleteOrder();
  const toggleModal = () => {
    setOpen(!open);
  };

  const displayOrderStatus = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return (
          <span className="rounded-full p-2 font-semibold text-white  bg-yellow-300">
            {status.toLocaleLowerCase()}
          </span>
        );
      case ORDER_STATUS.SHIPPED:
        return (
          <span className="rounded-full p-2 font-semibold text-white bg-orange-400">
            {status.toLocaleLowerCase()}
          </span>
        );
      case ORDER_STATUS.CANCELLED:
        return (
          <span className="rounded-full p-2 font-semibold text-white bg-red-700">
            {status.toLocaleLowerCase()}
          </span>
        );
      case ORDER_STATUS.DELIVERED:
        return (
          <span className="rounded-full p-2 font-semibold text-white bg-lime-400">
            {status.toLocaleLowerCase()}
          </span>
        );
    }
  };
  return (
    <div>
      <Table className="w-9/12 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Order id</TableHead>
            <TableHead>User id</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created on</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isFetching &&
            orders &&
            orders.map((order) => (
              <TableRow key={order.id}>
                {/* //?Improvement: Add copy paste on click functionality */}
                <TableCell className="w-56">{order.id}</TableCell>
                <TableCell className="w-56">{order.userId}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={order.address}>
                  {order.address}
                </TableCell>
                <TableCell className="w-56">
                  {convertArrayTimestampToDateTimeFormat(order.dateTime)}
                </TableCell>{" "}
                <TableCell>{displayOrderStatus(order.status)}</TableCell>
                <TableCell className="w-56">
                  <Button
                    className="mr-2 my-1 w-16"
                    disabled={deleteOrder.isPending && deleteOrder.variables === order.id}
                    onClick={() => {
                      toggleModal();
                      setCurrentOrder(order);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-16"
                    disabled={deleteOrder.isPending && deleteOrder.variables === order.id}
                    onClick={() => deleteOrder.mutate(order.id)}
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
        <div className="text-center my-2">Error fetching orders.</div>
      ) : null}
      <UpdateOrderModal open={open} toggleModal={toggleModal} data={currentOrder} />
    </div>
  );
};

export default OrderTable;
