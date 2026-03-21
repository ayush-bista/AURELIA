import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import heroModel from "@/assets/hero-model.jpg";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img
            src={heroModel}
            alt="About Aurelia"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <AnimatedSection className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Born from a passion for timeless elegance and sustainable craftsmanship
          </p>
        </AnimatedSection>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-sm tracking-widest text-gold uppercase">Our Mission</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-8 text-foreground">
              Empowering Through <span className="italic">Elegance</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Aurelia, we believe that accessories are more than adornments—they're 
              expressions of identity, confidence, and personal style. Our mission is to 
              create pieces that empower women to feel their most authentic selves.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every piece in our collection is designed with intention, crafted with care, 
              and made to be treasured for years to come.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Grid */}
      {/* <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm tracking-widest text-gold uppercase">Our Values</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 text-foreground">
              What We Stand For
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sustainable Craft",
                description:
                  "We partner with artisans who share our commitment to ethical practices and sustainable materials.",
              },
              {
                title: "Timeless Design",
                description:
                  "Our pieces are designed to transcend trends, becoming cherished companions for years to come.",
              },
              {
                title: "Conscious Luxury",
                description:
                  "True luxury is mindful. We believe in quality over quantity, beauty with purpose.",
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="p-8 bg-background rounded-sm shadow-soft text-center">
                  <h3 className="font-serif text-2xl mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Founder Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src="https://i.pinimg.com/1200x/62/aa/7b/62aa7be7457b32531c59e289eb0e0d90.jpg"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <span className="text-sm tracking-widest text-gold uppercase">
                The Founder
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-foreground">
                A Vision of <span className="italic">Beauty</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  "I started Aurelia with a simple belief: that every woman deserves 
                  accessories that make her feel extraordinary. Not through excess, 
                  but through thoughtful design and impeccable quality."
                </p>
                <p>
                  "Having worked in the fashion industry for over a decade, I saw 
                  the opportunity to create something different—a brand that honors 
                  traditional craftsmanship while embracing modern sensibility."
                </p>
                <p className="font-serif text-lg text-foreground italic">
                  — Ayush Bista, Founder & Creative Director
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 bg-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left" className="order-2 lg:order-1">
              <span className="text-sm tracking-widest text-gold uppercase">
                Craftsmanship
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-foreground">
                Made by <span className="italic">Hand</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Each Aurelia piece is crafted by skilled artisans who have 
                  dedicated their lives to their craft. We work with small 
                  workshops in Italy, France, and Portugal, where traditional 
                  techniques have been passed down through generations.
                </p>
                <p>
                  From hand-stitched leather goods to delicately set gemstones, 
                  every detail is executed with precision and care. This is 
                  not mass production—it's the art of making beautiful things.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right" className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
              {/* public/image/Shraddha Home.jpg */}
                <img
                  src="/Shraddha Home.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
