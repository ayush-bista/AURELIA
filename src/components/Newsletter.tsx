import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AnimatedSection from "./AnimatedSection";
import { api } from "@/lib/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await api.newsletter.subscribe(email);
      if (result.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        toast.success("Thank you for subscribing!");
      }
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
            Join the Aurelia Circle
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Be the first to discover new arrivals, exclusive offers, and styling inspiration.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/30"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-primary-foreground/60 mt-4">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Newsletter;
