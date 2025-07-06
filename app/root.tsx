import { DarkModeProvider } from "./contexts/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AppRouter from "./routes";

import '@fontsource-variable/merriweather';
import "@fontsource-variable/dm-sans";

import "@/styles/global.scss"

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AppRouter />
        </React.Suspense>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}
