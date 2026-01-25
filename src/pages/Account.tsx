import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAppState } from "@/context/AppState";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginEmail, signupEmail, loginWithProvider } = useAppState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await loginEmail(email, password);
      } else {
        await signupEmail(email, password, fullName);
      }
      navigate("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16 bg-cream">
        <div className="max-w-md mx-auto px-6">
          <AnimatedSection className="text-center mb-8">
            <h1 className="font-serif text-4xl mb-2 text-foreground">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your account"
                : "Join the Aurelia community"}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="bg-background p-8 rounded-sm shadow-soft space-y-6"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-foreground hover:text-gold transition-colors underline underline-offset-4"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-background p-8 rounded-sm shadow-soft space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  loginWithProvider("google");
                  navigate("/");
                }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  loginWithProvider("apple");
                  navigate("/");
                }}
              >
                Continue with Apple
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to shopping
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;
