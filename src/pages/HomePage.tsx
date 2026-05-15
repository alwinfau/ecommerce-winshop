import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  navigate: (path: string) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const featuredProducts = products.filter((p) => p.badge === 'Best Seller').slice(0, 4);
  const newProducts = products.filter((p) => p.badge === 'New' || p.badge === 'Sale').slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Belanja Online<br />Mudah & Terpercaya</h1>
          <p>Temukan ribuan produk berkualitas dengan harga terbaik. Gratis ongkir untuk pembelian pertama!</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Belanja Sekarang
            </button>
            <button className="btn-secondary" onClick={() => navigate('/products?category=elektronik')}>
              Lihat Promo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>10K+</strong>
              <span>Produk</span>
            </div>
            <div className="stat">
              <strong>50K+</strong>
              <span>Pelanggan</span>
            </div>
            <div className="stat">
              <strong>99%</strong>
              <span>Puas</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob"></div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="section-header">
          <h2>Kategori Populer</h2>
          <a href="#/products" className="see-all" onClick={() => navigate('/products')}>Lihat Semua →</a>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/products?category=${cat.slug}`)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.productCount} produk</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-header">
          <h2>Produk Terlaris</h2>
          <a href="#/products" className="see-all" onClick={() => navigate('/products')}>Lihat Semua →</a>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">Promo Spesial</span>
          <h2>Diskon hingga 50%</h2>
          <p>Untuk semua produk elektronik dan fashion. Berlaku sampai akhir bulan!</p>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Belanja Sekarang
          </button>
        </div>
      </section>

      {/* New Products */}
      <section className="section">
        <div className="section-header">
          <h2>Produk Terbaru</h2>
          <a href="#/products" className="see-all" onClick={() => navigate('/products')}>Lihat Semua →</a>
        </div>
        <div className="products-grid">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Gratis Ongkir</h3>
          <p>Untuk pesanan di atas Rp200.000</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔒</span>
          <h3>Pembayaran Aman</h3>
          <p>100% transaksi terproteksi</p>
        </div>
        <div className="feature">
          <span className="feature-icon">↩️</span>
          <h3>Mudah Dikembalikan</h3>
          <p>30 hari garansi pengembalian</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>Support 24/7</h3>
          <p>Tim kami siap membantu</p>
        </div>
      </section>
    </div>
  );
}
