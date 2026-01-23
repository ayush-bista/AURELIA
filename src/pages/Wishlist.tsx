import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  // In a real app, this would fetch from the database
  const wishlistItems: any[] = [];

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-foreground">
              Your Wishlist
            </h1>
            <p className="text-muted-foreground">
              Save your favorite pieces for later
            </p>
          </AnimatedSection>

          {wishlistItems.length === 0 ? (
            <AnimatedSection delay={0.1} className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-champagne flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-gold" />
              </div>
              <h2 className="font-serif text-2xl mb-4 text-foreground">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start exploring our collections and save items you love.
              </p>
              <Button asChild>
                <Link to="/collections">Explore Collections</Link>
              </Button>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Wishlist items would be mapped here */}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WishlistPage;
