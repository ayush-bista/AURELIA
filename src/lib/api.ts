import { mockProducts, mockCategories } from "./mockData";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const API_BASE = `${SUPABASE_URL}/functions/v1`;

export const api = {
  products: {
    getAll: async (categorySlug?: string) => {
      // Return mock data
      let filtered = mockProducts;
      if (categorySlug) {
        filtered = mockProducts.filter(p => p.categories?.slug === categorySlug);
      }
      return filtered.map(p => {
        if (p.categories?.slug === "jewelry" && p.categories?.name === "Jewelry") {
          return {
            ...p,
            categories: { ...p.categories, name: "Necklace" },
          };
        }
        return p;
      });
      
      // Original fetch code commented out for reference
      /*
      const params = categorySlug ? `?category=${categorySlug}` : "";
      const res = await fetch(`${API_BASE}/api-products${params}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
      */
    },
    getFeatured: async () => {
      // Return mock data
      const featured = mockProducts
        .filter(p => p.featured)
        .map(p => {
          if (p.categories?.slug === "jewelry" && p.categories?.name === "Jewelry") {
            return {
              ...p,
              categories: { ...p.categories, name: "Necklace" },
            };
          }
          return p;
        });
      return featured;

      // Original fetch code commented out for reference
      /*
      const res = await fetch(`${API_BASE}/api-products?featured=true`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
      */
    },
    getBySlug: async (slug: string) => {
      // Return mock data
      const product = mockProducts.find(p => p.slug === slug);
      if (!product) return null;
      if (product.categories?.slug === "jewelry" && product.categories?.name === "Jewelry") {
        return { ...product, categories: { ...product.categories, name: "Necklace" } };
      }
      return product;

      // Original fetch code commented out for reference
      /*
      const res = await fetch(`${API_BASE}/api-products?slug=${slug}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
      */
    },
  },
  categories: {
    getAll: async () => {
      // Return mock data
      return mockCategories.map(c =>
        c.slug === "jewelry" && c.name === "Jewelry"
          ? { ...c, name: "Necklace", description: "Elegant necklace for every occasion" }
          : c
      );

      // Original fetch code commented out for reference
      /*
      const res = await fetch(`${API_BASE}/api-categories`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
      */
    },
    getBySlug: async (slug: string) => {
      // Return mock data
      const category = mockCategories.find(c => c.slug === slug);
      if (!category) return null;
      if (category.slug === "jewelry" && category.name === "Jewelry") {
        return { ...category, name: "Necklace", description: "Elegant necklace for every occasion" };
      }
      return category;

      // Original fetch code commented out for reference
      /*
      const res = await fetch(`${API_BASE}/api-categories?slug=${slug}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
      */
    },
  },
  newsletter: {
    subscribe: async (email: string) => {
      const res = await fetch(`${API_BASE}/api-newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
  },
  auth: {
    signup: async (email: string, password: string, fullName: string) => {
      const res = await fetch(`${API_BASE}/api-auth?action=signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_BASE}/api-auth?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
  },
};
