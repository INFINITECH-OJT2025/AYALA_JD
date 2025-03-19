import { ThemeProvider } from "@/components/ui/theme-provider";
import ClientWrapper from "@/components/ClientWrapper"; // Import wrapper
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      
      <ClientWrapper /> {/* Handles Toaster & Service Worker */}
      {children}
    </ThemeProvider>
  );
}
