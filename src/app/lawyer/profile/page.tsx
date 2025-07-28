"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Pencil, Save, X, Camera, User as UserIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useUpdateProfile } from "@/api/auth";
import Loader from "@/components/ui/loader";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
  });

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const onPickAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("full_name", formData.full_name);
      payload.append("phone", formData.phone);
      if (avatarFile) payload.append("image", avatarFile);
      await updateProfile(payload);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (!user) return <Loader text="Loading profile..." />;

  return (
    <div className="flex flex-col w-full px-4 py-10">
      <div className="flex justify-center items-center w-full mt-[30px]">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-[#0E3B85] bg-gradient-to-r from-[#0F2E6F] to-[#104598]" />

            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 200"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0 200C200 200 200 0 400 0H600C400 0 400 200 200 200H0Z"
                  fill="url(#stripe)"
                  opacity="0.18"
                />
                <path
                  d="M300 200C500 200 500 0 700 0H900C700 0 700 200 500 200H300Z"
                  fill="url(#stripe)"
                  opacity="0.24"
                />
                <path
                  d="M600 200C800 200 800 0 1000 0H1200C1000 0 1000 200 800 200H600Z"
                  fill="url(#stripe)"
                  opacity="0.30"
                />
                <defs>
                  <linearGradient
                    id="stripe"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="200"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0E3B85" />
                    <stop offset="1" stopColor="#091F54" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group"
              onClick={() => isEditing && fileRef.current?.click()}
            >
              {avatarPreview || user?.profile_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarPreview || user?.profile_image}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover group-hover:opacity-70 transition"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-white bg-gray-200 text-gray-400 group-hover:opacity-70 transition">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
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
                  className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  name="full_name"
                  value={formData.full_name}
                  disabled={!isEditing}
                  onChange={onChangeField}
                  className={`w-full rounded-md p-3 text-sm border focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 cursor-not-allowed border-transparent"
                  }`}
                />
              </div>

              {/* Email (non-editable) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email ?? ""}
                  disabled
                  className="w-full rounded-md p-3 text-sm border bg-gray-100 cursor-not-allowed border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
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
                    className="inline-flex cursor-pointer items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-md"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex   cursor-pointer items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-5 py-2.5 rounded-md"
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
