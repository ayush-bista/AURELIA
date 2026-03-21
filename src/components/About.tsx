import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  return (
    <section id="about" className="py-24 bg-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection direction="left" className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
              <img
                // src="https://i.pinimg.com/1200x/62/aa/7b/62aa7be7457b32531c59e289eb0e0d90.jpg"
                // src="src/assets/Shraddha ring.jpg"
                src="public\Shraddha-ring.jpg"
                alt="Woman with elegant accessories"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-champagne rounded-2xl -z-10" />
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2} direction="right">
            <span className="text-sm tracking-widest text-gold uppercase">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-foreground">
              Crafted with
              <br />
              <span className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-foreground">Intention</span>
              {/* <span className="italic">Intention</span> */}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Born from a passion for timeless design, Aurelia began as a dream 
                to create accessories that empower women to express their unique style.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed and 
                ethically crafted, using sustainable materials and traditional 
                artisan techniques passed down through generations.
              </p>
              <p>
                We believe that true luxury lies in the details—the weight of 
                quality materials, the precision of expert craftsmanship, and the 
                joy of owning something made to last.
              </p>
            </div>
            <Button asChild variant="default" size="lg" className="mt-8">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
