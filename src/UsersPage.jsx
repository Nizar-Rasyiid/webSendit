import React, { useState } from "react";

const UsersPage = () => {
  // Dummy data untuk pengguna
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      phone: "123-456-7890",
      username: "johndoe",
      password: "password123",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      address: "456 Maple St",
      phone: "987-654-3210",
      username: "janedoe",
      password: "password456",
      role: "User",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });
  
  const [editingUser, setEditingUser] = useState(null);

  // Fungsi untuk menangani input perubahan
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menambah pengguna baru
  const addUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      username: "",
      password: "",
      role: "",
    });
  };

  // Fungsi untuk mengedit pengguna
  const editUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      username: user.username,
      password: user.password,
      role: user.role,
    });
  };

  // Fungsi untuk menyimpan perubahan setelah edit
  const saveUser = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? { ...editingUser, ...newUser } : user)));
    setEditingUser(null);
    setNewUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      username: "",
      password: "",
      role: "",
    });
  };

  // Fungsi untuk menghapus pengguna
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Form untuk menambah atau mengedit pengguna */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">{editingUser ? "Edit User" : "Add User"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-end">
          <input
            type="text"
            name="name"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Address"
            value={newUser.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="username"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Role"
            value={newUser.role}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={editingUser ? saveUser : addUser}
          >
            {editingUser ? "Save" : "Add"}
          </button>
        </div>
      </div>

      {/* Tabel pengguna */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.address}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
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

export default UsersPage;
