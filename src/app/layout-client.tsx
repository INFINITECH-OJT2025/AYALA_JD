import { ThemeProvider } from "@/components/ui/theme-provider";
import ClientWrapper from "@/components/ClientWrapper";
import SocialIcons from "@/components/common/SocialIcons";
import MyChatBot from "@/components/landing-page/Chatbot";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClientWrapper />
      {children}
      <SocialIcons />
      <MyChatBot/>
    </ThemeProvider>
  );
}
