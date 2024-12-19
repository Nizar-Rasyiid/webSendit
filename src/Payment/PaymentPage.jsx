import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreditCardIcon, PencilIcon, TrashIcon, PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    metode_pembayaran: "",
    id_user: "",
    harga: "",
    id_pemesanan: "",
  });
  const [editingPayment, setEditingPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  // Fetch payments from API
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.14:8000/api/payments");
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch payments");
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.14:8000/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new payment
  const addPayment = async () => {
    try {
      const response = await axios.post("http://192.168.1.14:8000/api/payments", newPayment);
      setPayments([...payments, response.data]);
      setNewPayment({
        metode_pembayaran: "",
        id_user: "",
        harga: "",
        id_pemesanan: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add payment");
    }
  };

  // Edit payment
  const editPayment = (payment) => {
    setEditingPayment(payment);
    setNewPayment({
      metode_pembayaran: payment.metode_pembayaran,
      id_user: payment.id_user,
      harga: payment.harga,
      id_pemesanan: payment.id_pemesanan,
    });
  };

  // Save edited payment
  const savePayment = async () => {
    try {
      const response = await axios.put(`http://192.168.1.14:8000/api/payments/${editingPayment.id_payment}`, newPayment);
      setPayments(payments.map((payment) => (payment.id_payment === editingPayment.id_payment ? response.data : payment)));
      setEditingPayment(null);
      setNewPayment({
        metode_pembayaran: "",
        id_user: "",
        harga: "",
        id_pemesanan: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to update payment");
    }
  };

  // Delete payment
  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://192.168.1.14:8000/api/payments/${id}`);
      setPayments(payments.filter((payment) => payment.id_payment !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete payment");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingPayment(null);
    setNewPayment({
      metode_pembayaran: "",
      id_user: "",
      harga: "",
      id_pemesanan: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Page Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <CreditCardIcon className="h-8 w-8 mr-3 text-blue-600" />
            Payment Management
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Payment Input Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="metode_pembayaran"
              placeholder="Payment Method"
              value={newPayment.metode_pembayaran}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="id_user"
              placeholder="User ID"
              value={newPayment.id_user}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input type="number" name="harga" placeholder="Price" value={newPayment.harga} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input
              type="number"
              name="id_pemesanan"
              placeholder="Order ID"
              value={newPayment.id_pemesanan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={editingPayment ? savePayment : addPayment} className={`px-4 py-2 rounded flex items-center ${editingPayment ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}>
              {editingPayment ? (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Payment
                </>
              )}
            </button>
            {editingPayment && (
              <button onClick={cancelEditing} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded flex items-center transition-colors">
                <XMarkIcon className="h-5 w-5 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Loading payments...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id_payment} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{payment.metode_pembayaran}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{users.find((user) => user.id_user === payment.id_user)?.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.harga}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.id_pemesanan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button onClick={() => editPayment(payment)} className="text-yellow-500 hover:text-yellow-600 mr-3" title="Edit">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => deletePayment(payment.id_payment)} className="text-red-500 hover:text-red-600" title="Delete">
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

export default PaymentPage;
