import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
