import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const OrderPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: "Alice Johnson", product: "Widget A", quantity: 5, total: 100 },
    { id: 2, customerName: "Bob Smith", product: "Gadget B", quantity: 2, total: 150 },
  ]);

  const [newOrder, setNewOrder] = useState({ customerName: "", product: "", quantity: "", total: "" });
  const [editingOrder, setEditingOrder] = useState(null);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const addOrder = () => {
    if (newOrder.customerName && newOrder.product && newOrder.quantity && newOrder.total) {
      setOrders([...orders, { id: Date.now(), ...newOrder, quantity: parseInt(newOrder.quantity), total: parseFloat(newOrder.total) }]);
      setNewOrder({ customerName: "", product: "", quantity: "", total: "" });
    }
  };

  const editOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({ ...order, quantity: order.quantity.toString(), total: order.total.toString() });
  };

  const saveOrder = () => {
    setOrders(orders.map((order) => (order.id === editingOrder.id ? { ...editingOrder, ...newOrder, quantity: parseInt(newOrder.quantity), total: parseFloat(newOrder.total) } : order)));
    setEditingOrder(null);
    setNewOrder({ customerName: "", product: "", quantity: "", total: "" });
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{editingOrder ? "Edit Order" : "Add Order"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input type="text" name="customerName" placeholder="Customer Name" value={newOrder.customerName} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2" />
          <input type="text" name="product" placeholder="Product" value={newOrder.product} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2" />
          <input type="number" name="quantity" placeholder="Quantity" value={newOrder.quantity} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2" />
          <input type="number" name="total" placeholder="Total" value={newOrder.total} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2" />
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editingOrder ? saveOrder : addOrder}>
          {editingOrder ? "Save" : "Add"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Customer Name</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border-b">{order.customerName}</td>
                <td className="px-4 py-2 border-b">{order.product}</td>
                <td className="px-4 py-2 border-b">{order.quantity}</td>
                <td className="px-4 py-2 border-b">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">
                  <button className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => editOrder(order)}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteOrder(order.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
