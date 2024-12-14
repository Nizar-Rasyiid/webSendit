import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import AdminDashboard from "./adminDashboard";
import UsersPage from "./Users/UsersPage";
import OrderPage from "./Orders/OrderPage";
import Login from "./auth/login";
import LoginPage from "./auth/login";
import PaymentPage from "./Payment/PaymentPage";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="lg:ml-64 transition-all duration-300 ease-in-out">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              {/* <Route path="/settings" element={<SettingsPage />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
