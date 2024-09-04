import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Links for navigation */}
        <ul className="flex space-x-4 text-white mb-4 md:mb-0">
          <li>
            <Link to="#" className="hover:text-blue-400">
              About Us
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-blue-400">
              Contact
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-blue-400">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-blue-400">
              Terms of Service
            </Link>
          </li>
        </ul>

        {/* Centered brand name */}
        <div className="lg:block hidden absolute left-1/2 transform -translate-x-1/2  text-white font-bold text-xl md:text-2xl">
          Facebrand
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-white">
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 hover:text-blue-400" />
          </Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:text-blue-400" />
          </Link>
          <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-blue-400" />
          </Link>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-4 text-sm">
        &copy; {new Date().getFullYear()} Facebrand. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
