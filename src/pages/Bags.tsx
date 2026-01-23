import Layout from "@/components/Layout";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { Skeleton } from "@/components/ui/skeleton";

const BagsPage = () => {
  const { data: products, isLoading } = useProducts("bags");

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1680770733998-dd4b09866450?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bags collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <AnimatedSection className="relative z-10 text-center text-primary-foreground">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Bags</h1>
          <p className="text-lg opacity-90 max-w-md mx-auto">
            Sophisticated handbags for every occasion
          </p>
        </AnimatedSection>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="aspect-square rounded-sm" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : products?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>
          {!isLoading && products?.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No bags available at the moment.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BagsPage;
