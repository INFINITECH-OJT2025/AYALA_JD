import { ThemeProvider } from "@/components/ui/theme-provider";
import ClientWrapper from "@/components/ClientWrapper";
import SocialIcons from "@/components/common/SocialIcons";
import ChatbotWrapper from "@/components/ChatbotWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClientWrapper />
      <SocialIcons />
      <ChatbotWrapper />
      {children}
    </ThemeProvider>
  );
}
