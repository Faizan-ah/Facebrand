import OrderTable from "@/components/admin/OrderTable";
import { Can } from "@/components/Can";
import React from "react";

const Order = () => {
  return (
    <Can
      permission="ADMIN_ORDER:VIEW"
      permissionType="views"
      yes={() => (
        <div>
          <h1 className="text-3xl font-semibold text-center my-3">Orders</h1>
          <OrderTable />
        </div>
      )}
    />
  );
};

export default Order;
