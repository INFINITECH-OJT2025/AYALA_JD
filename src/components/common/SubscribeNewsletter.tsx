"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/lib/api";

export function SubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);
    const response = await subscribeToNewsletter(email);
    setLoading(false);

    if (response.success) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error(response.message || "Failed to subscribe");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
      <p className="text-sm mb-3">
        Subscribe to our newsletter for the latest updates on new developments
        and promotions.
      </p>
      <div className="flex items-center bg-white rounded-lg overflow-hidden">
        <Input
          type="email"
          placeholder="Enter your email"
          className="border-0 rounded-none px-4 text-black placeholder-gray-500 bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="bg-blue-600 text-white px-4 rounded-none"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}
