import { Suspense } from "react";

import { RegisterPageContent } from "./RegisterPageContent";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterPageContent />
    </Suspense>
  );
}
