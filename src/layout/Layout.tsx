import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGlobalState } from "@/hooks/useGlobalState";

const Layout = () => {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow my-3">
        <Outlet />
      </main>
      {state.isAdmin && <Footer />}
    </div>
  );
};

export default Layout;
