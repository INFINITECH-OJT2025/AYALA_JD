"use client";

import { useEffect, useState } from "react";

// Notification Type
interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  isRead: boolean;
  created_at: string;
}

export default function useFetchNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notifications"); // ✅ Update with your API URL
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Initial fetch
  }, []);

  return { notifications, fetchNotifications };
}
