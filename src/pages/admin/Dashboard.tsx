import { Can } from "@/components/Can";
import React from "react";

const Dashboard = () => {
  return (
    <Can
      permission="ADMIN_DASHBOARD:VIEW"
      permissionType="views"
      yes={() => (
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl font-semibold text-center my-3">ADMIN DASHBOARD</h1>
          <p className="text-center">Coming soon...</p>
          <img src="/images/loading-cat.jpg" className="w-64" />
        </div>
      )}
    />
  );
};

export default Dashboard;
