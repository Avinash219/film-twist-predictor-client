"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { ReactNode } from "react";

const queryClient = new QueryClient()

export const QueryProvider = ({children} : {children : ReactNode}) => {
    return(
          <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
        {children}
        </ErrorBoundary>
      </QueryClientProvider>
    )
}