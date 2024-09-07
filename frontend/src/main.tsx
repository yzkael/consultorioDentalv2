import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
