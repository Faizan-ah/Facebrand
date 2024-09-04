import { Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGlobalState } from "@/hooks/useGlobalState";
import { routeNames } from "../routes/routeNames";
import { logout } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useGetCart } from "@/features/useCart";
import DisplayCart from "@/components/product/DisplayCart";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isAuthenticated, isAdmin } = state;
  const navigate = useNavigate();
  const userId = state.loggedInUser?.id ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: cart } = useGetCart(userId);

  const handleLogout = () => {
    logout();
    dispatch({ type: "SET_USER", payload: null });
    navigate(routeNames.public.home);
  };

  // Close toggle button on md screen
  useEffect(() => {
    const handleResize: EventListener = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount =
    (isAuthenticated && cart?.products.reduce((total, item) => total + item.quantity, 0)) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-slate-700 p-3">
      <div className="flex items-center justify-between">
        {/* Toggle Button */}
        <div
          className="md:hidden text-white hover:cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
        {/* Links for larger screens */}
        <div className={`hidden md:flex`}>
          <NavLinks
            isAdmin={isAdmin}
            isMenuOpen={isMenuOpen}
            isMobile={false}
            closeMenu={toggleMenu}
          />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold text-3xl">
          <Link to={isAdmin ? routeNames.admin.dashboard : routeNames.public.home}>Facebrand</Link>
        </div>

        {/* Profile and Cart Icons */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="text-white flex items-center">
                <UserCircle className="w-8 h-8" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul className="py-1">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => navigate(routeNames.public.login)}
                    >
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => navigate(routeNames.public.register)}
                    >
                      Register
                    </DropdownMenuItem>
                  </>
                )}
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none ml-3">
              <div className="border-none text-white flex items-center cursor-pointer relative">
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <ShoppingCart className="w-8 h-8" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-2 w-80 bg-white border rounded-lg shadow-lg">
              <DisplayCart userId={userId} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Links for smaller screens */}
      <div className="flex md:hidden ">
        <NavLinks
          isAdmin={isAdmin}
          isMenuOpen={isMenuOpen}
          isMobile={true}
          closeMenu={toggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
