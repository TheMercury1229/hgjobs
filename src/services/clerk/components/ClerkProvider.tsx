"use client";
import { useIsDarkMode } from "@/hooks/useDarkMode";
import { ClerkProvider as ClerkProviderOriginal } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Suspense } from "react";
export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();
  return (
    <Suspense>
      <ClerkProviderOriginal
        appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
      >
        {children}
      </ClerkProviderOriginal>
    </Suspense>
  );
}
