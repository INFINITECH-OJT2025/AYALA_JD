'use client';

import React, { useState } from 'react';
import Chatbot from 'react-chatbotify';

const MyChatBot: React.FC = () => {
  const [form, setForm] = useState<Record<string, any>>({});

  const formStyle: React.CSSProperties = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const flow = {
    start: {
      message: "Hi! Welcome to AyalaLand. May I know your name?",
      function: (params: any) => setForm((prev) => ({ ...prev, name: params.userInput })),
      path: "ask_interest",
    },
    ask_interest: {
      message: (params: any) => `Nice to meet you, ${params.userInput}! What type of property are you interested in?`,
      options: ["Studio Type", "1BR", "2BR", "Loft", "Penthouse"],
      chatDisabled: true,
      function: (params: any) => setForm((prev) => ({ ...prev, property_interest: params.userInput })),
      path: "ask_budget",
    },
    ask_budget: {
      message: "What is your estimated budget range?",
      options: ["Below ₱2M", "₱2M - ₱5M", "₱5M - ₱10M", "Above ₱10M"],
      chatDisabled: true,
      function: (params: any) => setForm((prev) => ({ ...prev, budget: params.userInput })),
      path: "end",
    },
    end: {
      message: "Thank you for your interest! Our AyalaLand specialist will reach out to you soon.",
      render: (
        <div style={formStyle}>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Property Interest:</strong> {form.property_interest}</p>
          <p><strong>Budget:</strong> {form.budget}</p>
        </div>
      ),
      options: ["Start New Inquiry"],
      chatDisabled: true,
      path: "start",
    },
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Chatbot
        flow={flow}
        settings={{
          chatHistory: { storageKey: "ayalaland_property_inquiry" },
          general: {
            primaryColor: "#10B981", // emerald
            secondaryColor: "#065F46", // dark emerald (optional)
          },
          chatButton: {
            icon: "/logo.png",  // ✅ use string path to public image
          },
          tooltip: {
            mode: "none", // 👈 removes the "Talk to me" tooltip text
          },
          header: {
            title: "AyalaLand Support 🤖",
          },
        }}
      />
    </div>
  );
};

export default MyChatBot;
