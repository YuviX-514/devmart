import { Suspense } from "react";
import ProductsPage from "./ProductsPageInner";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-white p-10">Loading products...</p>}>
      <ProductsPage />
    </Suspense>
  );
}
