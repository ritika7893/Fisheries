import { products } from "../data/products.js";

export function getProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}
