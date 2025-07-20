"use client";

import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    console.log("Saved Data", formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full mt-1 p-2 border rounded-md ${
              isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full mt-1 p-2 border rounded-md ${
              isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full mt-1 p-2 border rounded-md ${
              isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
