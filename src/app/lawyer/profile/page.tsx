"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Pencil, Save, X, Camera, User as UserIcon } from "lucide-react";
import Banner from "@/components/Banner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onPickAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    setIsEditing(false);
  };

  /* ────────── UI ────────── */
  return (
    <div className=" flex flex-col w-full px-4 py-10">
      <Banner name="Steve" appName="Lexintake" />
      <div className="flex justify-center items-center w-full mt-[30px]">
        <div className="w-full  max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
            {/* Avatar */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group"
              onClick={() => fileRef.current?.click()}
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover group-hover:opacity-70 transition"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-white bg-gray-200 text-gray-400 group-hover:opacity-70 transition">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              {/* Camera overlay */}
              <Camera className="absolute w-6 h-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition" />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickAvatar}
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pt-14 pb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Profile Information
              </h2>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex  cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <form className="space-y-5">
              {/** Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={onChangeField}
                  className={`w-full rounded-md p-3 text-sm border focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 cursor-not-allowed border-transparent"
                  }`}
                />
              </div>

              {/** Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={onChangeField}
                  className={`w-full rounded-md p-3 text-sm border focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 cursor-not-allowed border-transparent"
                  }`}
                />
              </div>

              {/** Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={onChangeField}
                  className={`w-full rounded-md p-3 text-sm border focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 cursor-not-allowed border-transparent"
                  }`}
                />
              </div>

              {/* Action buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex cursor-pointer items-center gap-1 bg-blue-primary hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-md"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center cursor-pointer gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-5 py-2.5 rounded-md"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
