import React from "react";
import { Home, Users, ShoppingCart, Settings, HelpCircle, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`bg-indigo-800 text-white h-screen w-64 fixed left-0 top-0 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Admin Panel Sendit</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 hover:bg-white  hover:text-indigo-700 rounded">
              <Home className="mr-2" size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center p-2 hover:bg-white  hover:text-indigo-700 rounded">
              <Users className="mr-2" size={20} /> Users
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center p-2 hover:bg-white  hover:text-indigo-700 rounded">
              <ShoppingCart className="mr-2" size={20} /> Orders
            </Link>
          </li>
          <li>
            <Link to="/payment" className="flex items-center p-2 hover:bg-white hover:text-indigo-700 rounded">
              <Wallet className="mr-2" size={20} /> Payment
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-2 hover:bg-white  hover:text-indigo-700 rounded">
              <Settings className="mr-2" size={20} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center p-2 hover:bg-white  hover:text-indigo-700 rounded">
              <HelpCircle className="mr-2" size={20} /> Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Sidebar;
