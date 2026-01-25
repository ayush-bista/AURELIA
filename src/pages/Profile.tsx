import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useAppState } from "@/context/AppState";
import { useProducts } from "@/hooks/useProducts";

const ProfilePage = () => {
  const { user, orders } = useAppState();
  const { data: products } = useProducts();

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">
              {user?.fullName ? `Welcome, ${user.fullName}` : "Your Account"}
            </h1>
            {user?.email && <p className="text-muted-foreground">{user.email}</p>}
          </AnimatedSection>

          <AnimatedSection className="mb-6">
            <h2 className="font-serif text-2xl text-foreground">Order History</h2>
          </AnimatedSection>

          {orders.length === 0 ? (
            <AnimatedSection className="text-muted-foreground">No orders yet.</AnimatedSection>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const items = order.items.map((i) => ({
                  quantity: i.quantity,
                  product: (products || []).find((p) => p.id === i.productId),
                }));
                const total = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);
                return (
                  <AnimatedSection key={order.id} className="bg-background p-6 rounded-sm shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Placed</p>
                        <p className="font-medium">{new Date(order.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      {items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {it.product?.name || "Item"} × {it.quantity}
                          </span>
                          <span>${((it.product?.price || 0) * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
