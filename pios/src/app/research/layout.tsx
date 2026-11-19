import Sidebar from '@/components/dashboard/Sidebar';

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-56 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
