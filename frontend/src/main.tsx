import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import ToastContextProvider from "./context/ToastContextProvider";
import RoleContextProvider from "./context/RoleContextProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <RoleContextProvider>
          <Router>
            <AppRoutes />
          </Router>
        </RoleContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
