export interface Category {
  name: string;
  query: string;
  keywords: string[];
}

export const categories: Category[] = [
  {
    name: "Smartphones",
    query: "smartphones",
    keywords: ["mobile", "phone", "smartphone", "android", "iphone"],
  },
  {
    name: "Laptops",
    query: "laptops",
    keywords: ["laptop", "notebook", "ultrabook", "macbook"],
  },
  {
    name: "Fragrances",
    query: "fragrances",
    keywords: ["perfume", "fragrance", "scent", "cologne", "deodorant"],
  },
  {
    name: "Groceries",
    query: "groceries",
    keywords: ["grocery", "vegetable", "fruit", "veggies", "food", "snack"],
  },
];
