"use client";

import { useState, useEffect, useRef } from "react";

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

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notifications");
      const data: Notification[] = await response.json();

      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 5000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { notifications, fetchNotifications };
}
  