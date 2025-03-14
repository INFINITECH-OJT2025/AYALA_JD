"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  is_read: "read" | "unread"; 
  created_at: string;
}

export default function useFetchAllNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true); // Prevents state updates after unmount

  // ✅ Use useCallback to avoid function recreation
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notifications");
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const data: Notification[] = await response.json();

      if (isMounted.current) {
        setNotifications((prev) => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data)); // Avoid unnecessary state updates
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 5000);

    return () => {
      isMounted.current = false; // Prevent state updates after unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchNotifications]);

  return { notifications, fetchNotifications };
}
