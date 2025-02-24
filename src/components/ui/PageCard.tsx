import { Card } from "@/components/ui/card";

export function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
      <Card className="w-full max-w-6xl mx-auto p-6 shadow-lg rounded-xl bg-white">
        {children}
      </Card>
    </div>
  );
}
