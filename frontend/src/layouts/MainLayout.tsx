import { ReactNode } from "react";
import Header from "../components/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen h-full flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainLayout;
