import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useProduct } from "@/hooks/useProducts";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || "");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-sm" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <section className="pt-32 pb-16 text-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/collections">Browse Collections</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <AnimatedSection className="mb-8">
            <Link
              to="/collections"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to collections
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <AnimatedSection direction="left">
              <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-champagne to-blush">
                    <span className="text-muted-foreground">
                      {product.categories?.name || "Accessory"}
                    </span>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Product Details */}
            <AnimatedSection delay={0.1} direction="right">
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-gold uppercase tracking-widest">
                    {product.categories?.name}
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl mt-2 text-foreground">
                    {product.name}
                  </h1>
                </div>

                <p className="text-2xl font-medium text-foreground">
                  ${product.price}
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  {product.description ||
                    "A beautifully crafted piece designed with intention and care. Each item is made using sustainable materials and traditional artisan techniques."}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!product.in_stock}
                  >
                    {product.in_stock ? "Add to Bag" : "Sold Out"}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className={product.in_stock ? "text-green-600" : "text-red-500"}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span>{product.categories?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
