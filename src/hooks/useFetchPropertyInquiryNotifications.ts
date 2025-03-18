import { useState, useEffect } from "react";

const useFetchPropertyInquiryNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch property inquiry notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/notifications/property-inquiries"
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching property inquiry notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // ✅ Auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return { notifications, fetchNotifications };
};

export default useFetchPropertyInquiryNotifications;
