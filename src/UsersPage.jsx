import React, { useState } from "react";

const UsersPage = () => {
  // Dummy data untuk pengguna
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fungsi untuk menangani input perubahan
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menambah pengguna baru
  const addUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "" });
  };

  // Fungsi untuk mengedit pengguna
  const editUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  // Fungsi untuk menyimpan perubahan setelah edit
  const saveUser = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? { ...editingUser, ...newUser } : user)));
    setEditingUser(null);
    setNewUser({ name: "", email: "" });
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
          {/* <input type="text" name="name" className="border border-gray-300 rounded px-4 py-2" placeholder="Name" value={newUser.name} onChange={handleInputChange} /> */}
          {/* <input type="email" name="email" className="border border-gray-300 rounded px-4 py-2" placeholder="Email" value={newUser.email} onChange={handleInputChange} /> */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={editingUser ? saveUser : addUser}>
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
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={() => editUser(user)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteUser(user.id)}>
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
