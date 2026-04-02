import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "@/components/PageTransition";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
