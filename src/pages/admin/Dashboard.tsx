import { Can } from "@/components/Can";
import React from "react";

const Dashboard = () => {
  return (
    <Can
      permission="ADMIN_DASHBOARD:VIEW"
      permissionType="views"
      yes={() => (
        <div>
          <h1 className="text-3xl font-semibold text-center my-3">ADMIN DASHBOARD</h1>
          <p className="text-center">Coming soon...</p>
        </div>
      )}
    />
  );
};

export default Dashboard;
