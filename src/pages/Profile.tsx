import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useAppState } from "@/context/AppState";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, Package, User as UserIcon, ShoppingBag } from "lucide-react";

const ProfilePage = () => {
  const { user, orders, logout } = useAppState();
  const { data: products } = useProducts();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-16 bg-cream/30 flex flex-col items-center justify-center">
          <AnimatedSection className="text-center space-y-4">
            <h1 className="font-serif text-4xl text-foreground">Your Account</h1>
            <p className="text-muted-foreground text-lg">Please sign in to view your profile.</p>
            <Button onClick={() => navigate("/auth")} size="lg">
              Sign In
            </Button>
          </AnimatedSection>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16 bg-cream/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <Card className="border-none shadow-soft bg-white/50 backdrop-blur-sm">
              <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                      {user.fullName ? `Welcome, ${user.fullName}` : "Welcome Back"}
                    </h1>
                    <p className="text-muted-foreground mt-1">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 w-full md:w-auto"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          <Separator className="my-8 opacity-50" />

          <AnimatedSection className="mb-6">
            <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
              <Package className="h-6 w-6" />
              Order History
            </h2>
          </AnimatedSection>

          {orders.length === 0 ? (
            <AnimatedSection>
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Looks like you haven't placed any orders yet. Start shopping to find your perfect jewelry.
                  </p>
                  <Button onClick={() => navigate("/collections")}>
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const items = order.items.map((i) => ({
                  quantity: i.quantity,
                  product: (products || []).find((p) => p.id === i.productId),
                }));
                const total = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);
                
                return (
                  <AnimatedSection key={order.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="bg-muted/30 flex flex-row items-center justify-between py-4 px-6">
                        <div className="space-y-1">
                          <CardDescription className="text-xs uppercase tracking-wider">Order ID</CardDescription>
                          <CardTitle className="text-sm font-mono text-foreground">{order.id}</CardTitle>
                        </div>
                        <div className="text-right space-y-1">
                          <CardDescription className="text-xs uppercase tracking-wider">Date Placed</CardDescription>
                          <div className="font-medium text-sm text-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm group">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                                  {it.product?.images?.[0] ? (
                                    <img 
                                      src={it.product.images[0]} 
                                      alt={it.product.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{it.product?.name || "Unknown Item"}</p>
                                  <p className="text-muted-foreground">Qty: {it.quantity}</p>
                                </div>
                              </div>
                              <span className="font-medium text-foreground">
                                {formatPrice((it.product?.price || 0) * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-muted-foreground">Total Amount</span>
                          <span className="text-lg font-serif font-bold text-foreground">{formatPrice(total)}</span>
                        </div>
                      </CardContent>
                    </Card>
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
