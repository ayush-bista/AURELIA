import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, Heart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Necklace", href: "/jewelry" },
    { name: "Earrings", href: "/earrings" },
    { name: "Bags", href: "/bags" },
    { name: "Rings", href: "/rings" },
    { name: "Bracelets", href: "/bracelets" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        location.pathname === "/" && !isScrolled
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl tracking-wide text-foreground hover:text-gold transition-colors"
          >
            AURELIA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/wishlist"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              to="/account"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-border">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "text-lg font-medium transition-colors",
                          isActive(link.href)
                            ? "text-gold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
