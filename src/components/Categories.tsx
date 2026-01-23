import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import modelScarf from "@/assets/model-scarf.jpg";
import modelBracelets from "@/assets/model-bracelets.jpg";
import modelEarrings from "@/assets/model-earrings.jpg";

const categories = [
  {
    name: "Necklace",
    description: "Delicate pieces that speak volumes",
    image: "https://i.pinimg.com/736x/47/8c/c2/478cc250a35d90a9db7404c20b45cb45.jpg",
    href: "/jewelry",
  },
  {
    name: "Bags & Clutches",
    description: "Carry your essentials in style",
    image: "https://i.pinimg.com/1200x/09/a5/d4/09a5d451f565c1ebabb0b2d7854ee7fc.jpg",
    href: "/bags",
  },
  {
    name: "Bracelets & Rings",
    description: "Stack, layer, and express yourself",
    image: modelBracelets,
    href: "/jewelry",
  },
];

const Categories = () => {
  return (
    <section id="collections" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm tracking-widest text-gold uppercase">
            Shop by Category
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-foreground">
            Find Your Style
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <AnimatedSection key={category.name} delay={index * 0.1}>
              <Link
                to={category.href}
                className="group relative overflow-hidden rounded-sm block"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <h3 className="font-serif text-2xl mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
