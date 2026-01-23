import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { Skeleton } from "./ui/skeleton";

const Featured = () => {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-sm tracking-widest text-gold uppercase">
              Bestsellers
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-foreground">
              Most Loved Pieces
            </h2>
          </div>
          <Link
            to="/collections"
            className="mt-4 md:mt-0 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            View All Products
          </Link>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square rounded-sm" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : products?.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <Link
                    to={`/product/${product.slug}`}
                    className="group cursor-pointer block"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-square bg-secondary rounded-sm mb-4 overflow-hidden"
                    >
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-champagne to-blush transition-transform duration-500 group-hover:scale-105">
                          <span className="text-muted-foreground text-sm">
                            {product.categories?.name || "Accessory"}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-foreground group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
