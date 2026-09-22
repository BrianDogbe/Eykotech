import { CatalogProvider } from "./useCatalog";
import { CartProvider } from "./useCart";
import { AuthProvider } from "./useAuth";
import { useHashRoute } from "./useHashRoute";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { ProductDetail } from "./pages/ProductDetail";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Delivery } from "./pages/Delivery";
import { Repairs } from "./pages/Repairs";
import { Contact } from "./pages/Contact";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { Faq } from "./components/Faq";
import { CtaBand } from "./components/CtaBand";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { BackToTop } from "./components/ui/BackToTop";

export default function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
        <CartProvider>
          <Shell />
        </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  );
}

function PageShell({ children }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <BackToTop />
    </>
  );
}

function Shell() {
  const route = useHashRoute();
  if (route === "/login") return <LoginPage />;
  if (route === "/signup") return <SignupPage />;
  if (route === "/forgot") return <ForgotPasswordPage />;
  if (route === "/about") return <PageShell><About /></PageShell>;
  if (route === "/products") return <PageShell><Products /></PageShell>;
  if (route === "/delivery") return <PageShell><Delivery /></PageShell>;
  if (route === "/repairs") return <PageShell><Repairs /></PageShell>;
  if (route === "/contact") return <PageShell><Contact /></PageShell>;

  const m = route.match(/^\/product\/(\d+)\/?$/);
  if (m) return <PageShell><ProductDetail id={Number(m[1])} /></PageShell>;

  return (
    <>
      <ScrollProgress />
      <Header overlay />
      <main>
        <Hero />
        <ProductGrid mode="home" centered headingEyebrow="" />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </>
  );
}