'use client';

import dynamic from 'next/dynamic';

const MyChatBot = dynamic(() => import('@/components/common/Chatbot'), {
  ssr: false,
});

export default function ChatbotWrapper() {
  return <MyChatBot />;
}
