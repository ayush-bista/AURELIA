import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string | null;
  images: string[] | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

export const useProducts = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => api.products.getAll(categorySlug),
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => api.products.getFeatured(),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.categories.getAll(),
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => api.products.getBySlug(slug),
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => api.categories.getBySlug(slug),
  });
};
