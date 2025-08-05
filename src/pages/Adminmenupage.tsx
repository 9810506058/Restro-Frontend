import React, { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const AdminMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>({
    name: "",
    description: "",
    price: 0,
    category: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: Date.now(),
      ...form
    };
    setMenuItems([...menuItems, newItem]);
    setForm({ name: '', description: '', price: 0, category: '' });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin - Add Menu Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Item
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Menu Items</h2>
        {menuItems.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id} className="border rounded p-4">
                <h3 className="font-bold text-lg">{item.name} - ${item.price.toFixed(2)}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">{item.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminMenuPage;
