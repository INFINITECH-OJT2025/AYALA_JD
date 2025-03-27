const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = "http://127.0.0.1:8000/api";

export const login = async (email: string, password: string) => {
  // Fetch CSRF token first
  await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const response = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ Needed for session-based authentication
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Invalid login credentials");
  }

  return response.json();
};

// ✅ Fetch user data
export async function fetchUser() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem("authToken"); // Remove session token
        window.location.href = "/auth/login"; // Redirect to login
      }
      throw new Error("Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
}

// ✅ Logout function
export async function logout() {
  try {
    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    sessionStorage.removeItem("authToken");
    sessionStorage.clear();

    // ✅ Prevent Back Button Exploit
    window.location.href = "/auth/login"; // Forces full page reload
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export async function forgotPassword(email: string) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to send reset link.");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

// Fetch properties
export async function fetchProperties() {
  try {
    const response = await fetch(`${API_URL}/properties`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch properties: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();
    console.log("API Response:", text);
    const data = JSON.parse(text);

    // ✅ Fetch unique views for each property
    const propertiesWithViews = await Promise.all(
      data.map(async (property: any) => {
        const viewResponse = await fetch(
          `${API_URL}/properties/${property.id}`
        );
        const viewData = await viewResponse.json();
        return { ...property, unique_views: viewData.unique_views }; // ✅ Add unique_views to property
      })
    );

    return propertiesWithViews;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function trackPropertyView(propertyId: number) {
  try {
    const response = await fetch(
      `${API_URL}/properties/${propertyId}/track-view`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await response.json();
    console.log("Track View Response:", result); // ✅ Log response
  } catch (error) {
    console.error("Error tracking property view:", error);
  }
}

// Upload images
export async function uploadImage(formData: FormData) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/properties", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

export async function submitProperty(formData: FormData) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/properties", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit property: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting property:", error);
    throw error;
  }
}

export const deleteProperty = async (id: number) => {
  const res = await fetch(`${API_URL}/properties/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete property");
};

export async function updatePropertyStatus(
  propertyId: number,
  status: string,
  reason?: string
) {
  try {
    const response = await fetch(
      `${API_URL}/properties/${propertyId}/update-status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update property status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating property status:", error);
    throw error;
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

//job area

export const createJob = async (formData: FormData) => {
  const res = await fetch("http://127.0.0.1:8000/api/jobs", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return await res.json();
};

export const fetchJobs = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/jobs/all");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
};

export const deleteJob = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete job");
};

export const fetchFeaturedJobs = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/jobs?limit=3");
  if (!res.ok) throw new Error("Failed to fetch featured jobs");
  return res.json();
};

// export const updateJob = async (id: number, updatedData: any) => {
//   const formData = new FormData();

//   Object.entries(updatedData).forEach(([key, value]) => {
//     if (value instanceof File) {
//       formData.append(key, value);
//     } else if (typeof value === "string" || typeof value === "number") {
//       formData.append(key, value.toString()); // ✅ Ensure proper data type
//     }
//   });

//   const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
//     method: "PUT",
//     body: formData,
//   });

//   const data = await res.json();
//   console.log("Update Response:", data); // ✅ Debug response

//   if (!res.ok) throw new Error("Failed to update job");

//   return data;
// };

export const updateJob = async (id: number, updatedData: any) => {
  const formData = new FormData();

  Object.entries(updatedData).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number") {
      formData.append(key, value.toString());
    }
  });

  const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
    method: "POST", // ✅ Laravel may not accept PUT with FormData, so use POST
    headers: {
      "X-HTTP-Method-Override": "POST", // ✅ Trick Laravel to treat this as a PUT request
    },
    body: formData,
  });

  const data = await res.json();
  console.log("Update Response:", data); // ✅ Debug response

  if (!res.ok) throw new Error("Failed to update job");

  return data;
};

// job application area

export async function submitApplication(formData: FormData) {
  const res = await fetch("http://127.0.0.1:8000/api/job-applications", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json", // ✅ Ensure Laravel API returns JSON
    },
    credentials: "include", // ✅ Ensures Laravel accepts the request properly
  });

  if (!res.ok) {
    const errorData = await res.json(); // ✅ Get error response from Laravel
    throw new Error(errorData.message || "Failed to submit application");
  }

  return await res.json();
}


export const fetchApplicants = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/job-applicants");
  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch applicants");

  return data;
};

export const approveApplicant = async (id: number, message: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/job-applicants/${id}/approve`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) throw new Error("Failed to approve applicant");
};

export const rejectApplicant = async (id: number, message: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/job-applicants/${id}/reject`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) throw new Error("Failed to reject applicant");
};

export const deleteApplicant = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/job-applicants/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete applicant");
};

//over inquiries

export const sendInquiry = async (inquiryData: any) => {
  const res = await fetch("http://127.0.0.1:8000/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inquiryData),
  });

  if (!res.ok) throw new Error("Failed to send inquiry");

  return res.json();
};

export const fetchInquiries = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/inquiries");
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
};

export async function replyInquiries(id: number, message: string) {
  const response = await fetch(`${API_URL}/inquiries/${id}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, status: "replied" }), // ✅ Send status update
  });

  return response.ok ? response.json() : null;
}

export async function archiveInquiries(id: number) {
  const response = await fetch(`${API_URL}/inquiries/${id}/archive`, {
    method: "PUT",
  });
  return response.ok ? response.json() : null;
}

export async function unarchiveInquiries(id: number) {
  const response = await fetch(`${API_URL}/inquiries/${id}/unarchive`, {
    method: "PUT",
  });
  return response.ok ? response.json() : null;
}

export const deleteInquiries = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/inquiries/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete inquiry");
  return res.json();
};

// property inquiries

export const sendPropertyInquiry = async (formData: FormData) => {
  const res = await fetch("http://127.0.0.1:8000/api/property-inquiries", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to send inquiry");
  return res.json();
};

export const replyInquiry = async (id: number, message: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/property-inquiries/${id}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) throw new Error("Failed to send reply");
  return res.json();
};

export const archiveInquiry = async (id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/property-inquiries/${id}/archive`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to archive inquiry");
  return res.json();
};

// ✅ New function: Unarchive an inquiry
export const unarchiveInquiry = async (id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/property-inquiries/${id}/unarchive`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to unarchive inquiry");
  return res.json();
};

export const deleteInquiry = async (id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/property-inquiries/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete inquiry");
  return res.json();
};

//property appointment
export const fetchAppointments = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/appointments");
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
};

export const replyAppointment = async (id: number, message: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/appointments/${id}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) throw new Error("Failed to send reply");
  return res.json();
};

export const archiveAppointment = async (id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/appointments/${id}/archive`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to archive appointment");
  return res.json();
};

export const unarchiveAppointment = async (id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/appointments/${id}/unarchive`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to unarchive appointment");
  return res.json();
};

export const deleteAppointment = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/appointments/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete appointment");
  return res.json();
};

export const createAppointment = async (appointmentData: any) => {
  const res = await fetch("http://127.0.0.1:8000/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });

  if (!res.ok) throw new Error("Failed to book appointment");
  return res.json();
};

// admin property inquiries
export const submitPropertyInquiry = async (inquiryData: any) => {
  const res = await fetch("http://127.0.0.1:8000/api/property-inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiryData),
  });

  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
};

export const fetchPropertyInquiries = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/property-inquiries");
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
};

// Fetch all news posts
export const fetchNews = async () => {
  const res = await fetch(`${API_BASE}/news`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};

// Fetch only published news posts
export const fetchPublishedNews = async () => {
  const res = await fetch(`${API_BASE}/news?status=published`);
  if (!res.ok) throw new Error("Failed to fetch published news");
  return res.json();
};

// Fetch single news post
export const fetchNewsById = async (id: number) => {
  const res = await fetch(`${API_BASE}/news/${id}`);
  if (!res.ok) throw new Error("Failed to fetch news post");
  return res.json();
};

// Create a news post
export const createNews = async (formData: FormData) => {
  const res = await fetch(`${API_BASE}/news`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create news post");
  return res.json();
};

// Update a news post
export const updateNews = async (id: number, formData: FormData) => {
  const res = await fetch(`${API_BASE}/news/${id}`, {
    method: "POST", // ✅ Laravel may not accept PUT with FormData, so use POST
    headers: {
      "X-HTTP-Method-Override": "POST", // ✅ Trick Laravel to treat this as a PUT request
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update news post");
  return res.json();
};

// Delete a news post
export const deleteNews = async (id: number) => {
  const res = await fetch(`${API_BASE}/news/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete news post");
  return res.json();
};

// services
export async function fetchServices() {
  const response = await fetch(`${API_URL}/services`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
}

export async function createService(formData: FormData) {
  const response = await fetch(`${API_URL}/services`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create service");
  return response.json();
}

export async function updateService(id: number, formData: FormData) {
  formData.append("_method", "PUT"); // ✅ Tell Laravel this is a PUT request

  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "POST", // ✅ Laravel treats this as PUT due to _method=PUT
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update service");
  return response.json();
}

export async function deleteService(id: number) {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete service");
  return response.json();
}

// Fetch property stats
export async function fetchPropertyStats() {
  try {
    const response = await fetch(`${API_BASE}/properties/stats`);
    if (!response.ok) throw new Error("Failed to fetch property stats");
    return await response.json();
  } catch (error) {
    console.error("Error fetching property stats:", error);
    throw error;
  }
}

export async function fetchJobStats() {
  try {
    const res = await fetch(`${API_URL}/job-applications/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`Failed to fetch stats: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching job stats:", error);
    return { total: 0, pending: 0, approved: 0, rejected: 0, applications: [] }; // ✅ Default values
  }
}

export async function fetchInquiryStats() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/inquiries/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch inquiry stats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching inquiry stats:", error);
    return [];
  }
}

export async function fetchRecentInquiries() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/inquiries?limit=5");
    if (!response.ok) {
      throw new Error("Failed to fetch inquiries");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

export async function fetchJobApplications() {
  try {
    const res = await fetch(`${API_URL}/job-applications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok)
      throw new Error(`Failed to fetch job applications: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return []; // ✅ Return empty array on failure
  }
}

export interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  is_read: "read" | "unread";
  created_at: string;
}

// ✅ Fetch all notifications
export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/notifications");
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function fetchLatestNotifications(
  latestId: number
): Promise<Notification[]> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications?latest_id=${latestId}`
    );
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

// ✅ Mark a notification as read
export async function markNotificationAsRead(id: number): Promise<boolean> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications/${id}/mark-read`,
      {
        method: "POST",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
}

// ✅ Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/notifications/mark-all-read",
      {
        method: "POST",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
}

// ✅ Delete a notification
export async function deleteNotification(id: number): Promise<boolean> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
}

export async function fetchAboutUsContent() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/about-us`);
    if (!response.ok) {
      throw new Error("Failed to fetch About Us content");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching About Us:", error);
    return null;
  }
}

export async function updateAboutUsContent(formData: FormData) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/about-us`, {
      method: "POST", // ✅ Supports both create & update
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update About Us content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating About Us:", error);
    return null;
  }
}

export async function deleteAboutUsContent() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/about-us`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete About Us content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting About Us:", error);
    return null;
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Subscription failed");

    return await res.json();
  } catch (error) {
    console.error("Error subscribing:", error);

    // ✅ Explicitly cast error to an Error type
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return { success: false, message: errorMessage };
  }
}

// application schedule

export async function scheduleApplicant(id: number, date: Date, message: string) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  // ✅ Convert Date object to a proper MySQL DateTime format (YYYY-MM-DD HH:MM:SS)
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00`;
  
  const response = await fetch(`http://localhost:8000/api/applicants/${id}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schedule_datetime: formattedDate, message }), // ✅ Ensure correct field name
  });
  

  if (!response.ok) throw new Error("Failed to schedule appointment");

  return response.json();
}

const API_BASE_URL = "http://localhost:8000/api"; // Change this if your Laravel backend URL is different

/**
 * Fetch reschedule details for an applicant.
 * @param id - Applicant ID
 * @param email - Applicant Email (for verification)
 */
export async function fetchRescheduleDetails(id: string, email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/reschedule/${id}?email=${encodeURIComponent(email)}`);

    // Get the raw text response before parsing
    const text = await response.text();
    console.log("Raw API Response:", text);

    return JSON.parse(text); // Manually parse JSON
  } catch (error) {
    console.error("Error fetching reschedule details:", error);
    throw error;
  }
}

/**
 * Submit a reschedule request.
 * @param formData - Form data containing applicant ID, email, new schedule, message, and optional file
 */
export async function submitReschedule(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reschedule`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit reschedule request.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting reschedule request:", error);
    throw error;
  }
}

export async function updateRescheduleStatus(id: number, status: "approved" | "rejected") {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/reschedule/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update schedule status.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating schedule status:", error);
    throw error;
  }
}








