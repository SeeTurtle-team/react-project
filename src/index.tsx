import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";
import "./flags.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log("onError", error);
    },
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </QueryClientProvider>
);
