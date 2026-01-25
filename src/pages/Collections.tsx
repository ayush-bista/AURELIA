import Layout from "@/components/Layout";
import { useProducts, useCategories } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import bestSellerBanner from "@/assets/Best_seller_web_banner_1_1.png";

const CollectionsPage = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[89vh] min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={bestSellerBanner}
            alt="Collections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <AnimatedSection className="relative z-10 text-primary-foreground px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl">
              <span className="text-sm tracking-widest text-gold uppercase block">
                Collections
              </span>
              <h1 className="font-serif text-5xl md:text-7xl mt-4 mb-3">
                Collections
              </h1>
              <div className="h-[2px] w-24 bg-gold mb-6" />
              <p className="text-lg opacity-90">
                Explore our curated pieces across categories
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 bg-cream border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/collections"
              className="px-4 py-2 text-sm font-medium text-foreground bg-background rounded-full shadow-soft"
            >
              All
            </Link>
            {categories?.map((category) => (
              <Link
                key={category.id}
                to={`/${category.slug}`}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded-full transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="aspect-square rounded-sm" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : products?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} delayMultiplier={0.03} duration={0.2} />
                ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;
