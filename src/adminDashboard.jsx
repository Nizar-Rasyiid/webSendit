import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import StatCard from "./StatCard";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch payments or other related data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/payments");
      // Assuming `response.data` is an array of payments
      const processedData = response.data.map((payment) => ({
        name: payment.month, // Adjust based on your API response
        sales: payment.sales, // Adjust based on your API response
      }));
      setData(processedData);

      // Calculate total revenue
      const total = response.data.reduce((acc, payment) => acc + payment.harga, 0);
      setTotalRevenue(total);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch payments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-8">
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} title="Total Users" value="1,234" />
        <StatCard icon={ShoppingCart} title="Total Orders" value="56" />
        <StatCard icon={DollarSign} title="Total Revenue" value={`${totalRevenue}`} />
        <StatCard icon={Activity} title="Active Users" value="789" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        {loading ? (
          <p>Loading chart data...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
