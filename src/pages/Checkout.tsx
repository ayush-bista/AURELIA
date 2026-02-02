import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useAppState } from "@/context/AppState";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/currency";

const CheckoutPage = () => {
  const { data: products } = useProducts();
  const { cart, updateQuantity, removeFromCart, requireAuth, placeOrder } = useAppState();
  const navigate = useNavigate();

  const items = (products || []).filter((p) => cart.some((c) => c.productId === p.id));
  const getQty = (id: string) => cart.find((c) => c.productId === id)?.quantity || 0;
  const total = items.reduce((sum, p) => sum + p.price * getQty(p.id), 0);

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-2 text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Review your bag and proceed to payment</p>
          </AnimatedSection>

          {items.length === 0 ? (
            <AnimatedSection delay={0.1} className="text-center py-16">
              <h2 className="font-serif text-2xl mb-4 text-foreground">Your bag is empty</h2>
              <p className="text-muted-foreground mb-8">Add items to your bag to continue.</p>
              <Button asChild>
                <Link to="/collections">Browse Collections</Link>
              </Button>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {items.map((p) => (
                  <AnimatedSection key={p.id} className="bg-background p-4 rounded-sm shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-sm overflow-hidden bg-secondary">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">{p.categories?.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatPrice(p.price)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(p.id, Math.max(1, getQty(p.id) - 1))}
                          >
                            -
                          </Button>
                          <span className="min-w-[2rem] text-center">{getQty(p.id)}</span>
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(p.id, getQty(p.id) + 1)}>
                            +
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(p.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="space-y-4">
                <AnimatedSection className="bg-background p-6 rounded-sm shadow-soft">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Calculated at checkout</span>
                  </div>
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (!requireAuth(navigate)) return;
                        placeOrder();
                        navigate("/profile");
                      }}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
