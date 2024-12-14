import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    id_user: "",
    jarak: "",
    lokasi_jemput: "",
    lokasi_tujuan: "",
    status: "",
    nama_penerima: "",
    id_kurir: "",
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.17:8000/api/pemesanans");
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new order
  const addOrder = async () => {
    try {
      const response = await axios.post("http://192.168.1.17:8000/api/pemesanans", newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({
        id_user: "",
        jarak: "",
        lokasi_jemput: "",
        lokasi_tujuan: "",
        status: "",
        nama_penerima: "",
        id_kurir: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add order");
    }
  };

  // Edit order
  const editOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({
      id_user: order.id_user,
      jarak: order.jarak.toString(),
      lokasi_jemput: order.lokasi_jemput,
      lokasi_tujuan: order.lokasi_tujuan,
      status: order.status,
      nama_penerima: order.nama_penerima,
      id_kurir: order.id_kurir.toString(),
    });
  };

  // Save edited order
  const saveOrder = async () => {
    try {
      const response = await axios.put(`http://192.168.1.17:8000/api/pemesanans/${editingOrder.id_pemesanan}`, newOrder);
      setOrders(orders.map((order) => (order.id_pemesanan === editingOrder.id_pemesanan ? response.data : order)));
      setEditingOrder(null);
      setNewOrder({
        id_user: "",
        jarak: "",
        lokasi_jemput: "",
        lokasi_tujuan: "",
        status: "",
        nama_penerima: "",
        id_kurir: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to update order");
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://192.168.1.17:8000/api/pemesanans/${id}`);
      setOrders(orders.filter((order) => order.id_pemesanan !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingOrder(null);
    setNewOrder({
      id_user: "",
      jarak: "",
      lokasi_jemput: "",
      lokasi_tujuan: "",
      status: "",
      nama_penerima: "",
      id_kurir: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Page Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">Orders Management</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Order Input Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" name="id_user" placeholder="User ID" value={newOrder.id_user} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" name="jarak" placeholder="Distance" value={newOrder.jarak} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input
              type="text"
              name="lokasi_jemput"
              placeholder="Pickup Location"
              value={newOrder.lokasi_jemput}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lokasi_tujuan"
              placeholder="Destination Location"
              value={newOrder.lokasi_tujuan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input type="text" name="status" placeholder="Status" value={newOrder.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input
              type="text"
              name="nama_penerima"
              placeholder="Recipient Name"
              value={newOrder.nama_penerima}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="id_kurir"
              placeholder="Courier ID"
              value={newOrder.id_kurir}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={editingOrder ? saveOrder : addOrder} className={`px-4 py-2 rounded flex items-center ${editingOrder ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}>
              {editingOrder ? (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Order
                </>
              )}
            </button>
            {editingOrder && (
              <button onClick={cancelEditing} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded flex items-center transition-colors">
                <XMarkIcon className="h-5 w-5 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courier ID</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id_pemesanan} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order.id_user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.jarak}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.lokasi_jemput}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.lokasi_tujuan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.nama_penerima}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id_kurir}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button onClick={() => editOrder(order)} className="text-yellow-500 hover:text-yellow-600 mr-3" title="Edit">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => deleteOrder(order.id_pemesanan)} className="text-red-500 hover:text-red-600" title="Delete">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;