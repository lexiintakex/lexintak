"use client";

// Mock API functions for demonstration
export function useApplicationByUserId(userId: string) {
  // Simulate API call with mock data
  const mockData = {
    user: {
      user_id: userId,
      full_name: "John Doe",
      email: "john.doe@example.com",
      profile_image: "/default-avatar.png",
    },
    responses: [
      { key_name: "full_name", key_value: "John Doe", language: "en" },
      { key_name: "email", key_value: "john.doe@example.com", language: "en" },
      { key_name: "phone", key_value: "+1 (555) 123-4567", language: "en" },
      { key_name: "date_of_birth", key_value: "1990-05-15", language: "en" },
      { key_name: "nationality", key_value: "American", language: "en" },
      { key_name: "passport_number", key_value: "US123456789", language: "en" },
    ],
    documents: [
      {
        file_paths: [
          { file_type: "passport", file_url: "/documents/passport.pdf" },
          {
            file_type: "birth_certificate",
            file_url: "/documents/birth_cert.pdf",
          },
        ],
      },
    ],
  };

  return {
    data: mockData,
    isLoading: false,
    isError: false,
  };
}
