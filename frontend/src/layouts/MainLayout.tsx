import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen h-full flex-col bg-loginBgPink">
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainLayout;
