import { useRouter } from './hooks/useRouter';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function AppContent() {
  const { route, navigate } = useRouter();

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'products':
        return <ProductsPage navigate={navigate} params={route.params} />;
      case 'product-detail':
        return <ProductDetailPage navigate={navigate} params={route.params} />;
      case 'cart':
        return <CartPage navigate={navigate} />;
      case 'checkout':
        return <CheckoutPage navigate={navigate} />;
      case 'login':
        return <LoginPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar navigate={navigate} currentPage={route.page} />
      <main className="main-content">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
