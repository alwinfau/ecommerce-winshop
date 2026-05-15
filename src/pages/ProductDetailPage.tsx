import { useState } from 'react';
import { products } from '../data/products';
import { formatPrice, getDiscount } from '../utils/format';
import { useCart } from '../context/CartContext';
import ProductCard, { RatingStars } from '../components/ProductCard';
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  ArrowUturnLeftIcon,
  LockClosedIcon,
  ChevronRightIcon,
} from '../components/Icons';

interface ProductDetailPageProps {
  navigate: (path: string) => void;
  params: Record<string, string>;
}

export default function ProductDetailPage({ navigate, params }: ProductDetailPageProps) {
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Produk tidak ditemukan</h2>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          Kembali ke Produk
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <a href="#/" onClick={() => navigate('/')}>Home</a>
        <ChevronRightIcon size={14} />
        <a href="#/products" onClick={() => navigate('/products')}>Produk</a>
        <ChevronRightIcon size={14} />
        <a
          href={`#/products?category=${product.category}`}
          onClick={() => navigate(`/products?category=${product.category}`)}
        >
          {product.category}
        </a>
        <ChevronRightIcon size={14} />
        <span className="current">{product.name}</span>
      </div>

      <div className="detail-container">
        <div className="detail-image">
          {product.badge && (
            <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
              {product.badge}
            </span>
          )}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <RatingStars rating={product.rating} />
            <span>{product.rating}</span>
            <span className="divider">|</span>
            <span>{product.reviewCount} ulasan</span>
            <span className="divider">|</span>
            <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
              {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
            </span>
          </div>

          <div className="detail-pricing">
            <span className="detail-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="detail-original">{formatPrice(product.originalPrice)}</span>
                <span className="detail-discount">
                  -{getDiscount(product.originalPrice, product.price)}%
                </span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <MinusIcon size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
                <PlusIcon size={16} />
              </button>
            </div>
            <button
              className={`btn-add-cart-lg ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {addedToCart ? (
                <><CheckCircleIcon size={18} /> Ditambahkan!</>
              ) : (
                <><ShoppingCartIcon size={18} /> Tambah ke Keranjang</>
              )}
            </button>
            <button
              className="btn-buy-now"
              onClick={() => {
                addToCart(product, quantity);
                navigate('/checkout');
              }}
              disabled={product.stock === 0}
            >
              Beli Sekarang
            </button>
          </div>

          <div className="detail-features">
            <div className="detail-feature">
              <TruckIcon size={18} /> Gratis Ongkir
            </div>
            <div className="detail-feature">
              <ArrowUturnLeftIcon size={18} /> 30 Hari Pengembalian
            </div>
            <div className="detail-feature">
              <LockClosedIcon size={18} /> Pembayaran Aman
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Produk Serupa</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
