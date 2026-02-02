import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Product } from "@/hooks/useProducts";
import { Heart } from "lucide-react";
import { useAppState } from "@/context/AppState";
import { formatPrice } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
  index?: number;
  delayMultiplier?: number;
  duration?: number;
}

const ProductCard = ({ product, index = 0, delayMultiplier = 0.05, duration }: ProductCardProps) => {
  const { toggleWishlist, isWishlisted, requireAuth } = useAppState();
  const navigate = useNavigate();
  return (
    <AnimatedSection delay={index * delayMultiplier} duration={duration}>
      <Link to={`/product/${product.slug}`} className="group block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="relative aspect-square bg-secondary rounded-sm mb-4 overflow-hidden"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-champagne to-blush transition-transform duration-500 group-hover:scale-105">
              <span className="text-muted-foreground text-sm">
                {product.categories?.name || "Accessory"}
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!requireAuth(navigate)) return;
              toggleWishlist(product);
            }}
            className="absolute top-3 right-3 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          >
            <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? "text-gold" : "text-muted-foreground"} transition-colors`} />
          </button>
          {!product.in_stock && (
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              Sold Out
            </div>
          )}
        </motion.div>
        <div className="space-y-1">
          <h3 className="font-medium text-foreground group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </AnimatedSection>
  );
};

export default ProductCard;
