import { categories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";

  let products: Product[] = [];
  let notFound = false;

  const res = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  if (data.products && data.products.length > 0) {
    products = data.products;
  } else {
    const matchedCategory = categories.find((cat) =>
      cat.keywords.some((kw) =>
        query.toLowerCase().includes(kw.toLowerCase())
      )
    );

    if (matchedCategory) {
      const resCat = await fetch(
        `https://dummyjson.com/products/category/${matchedCategory.query}`
      );
      const dataCat = await resCat.json();
      products = dataCat.products || [];
    } else {
      notFound = true;
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-30 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search Results for “{query}”
      </h1>

      {notFound && (
        <p className="text-red-400 text-lg">
          Sorry, we don’t have products matching “{query}”.
        </p>
      )}

      {!notFound && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border border-neutral-800 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 bg-neutral-900"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm">
                  {product.title}
                </h3>
                <p className="text-purple-400 text-sm mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
