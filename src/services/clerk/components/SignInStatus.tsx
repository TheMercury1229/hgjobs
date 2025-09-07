import { Suspense } from "react";
import {
  SignedIn as SignedInClerk,
  SignedOut as SignedOutClerk,
} from "@clerk/nextjs";
export function SignedOut({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SignedOutClerk>{children}</SignedOutClerk>
    </Suspense>
  );
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SignedInClerk>{children}</SignedInClerk>
    </Suspense>
  );
}
