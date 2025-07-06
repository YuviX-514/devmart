export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProductsPage from "./ProductsPage";

export default function ParentComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
