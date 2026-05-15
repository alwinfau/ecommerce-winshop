import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

interface CartPageProps {
  navigate: (path: string) => void;
}

export default function CartPage({ navigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-state page-empty">
        <span className="empty-icon">🛒</span>
        <h2>Keranjang Kosong</h2>
        <p>Belum ada produk di keranjang belanja Anda.</p>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          Mulai Belanja
        </button>
      </div>
    );
  }

  const shippingCost = totalPrice >= 200000 ? 0 : 15000;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="cart-page">
      <h1>Keranjang Belanja</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="cart-item-image"
                onClick={() => navigate(`/products/${item.product.id}`)}
              />
              <div className="cart-item-info">
                <h3 onClick={() => navigate(`/products/${item.product.id}`)}>
                  {item.product.name}
                </h3>
                <span className="cart-item-category">{item.product.category}</span>
                <span className="cart-item-price">{formatPrice(item.product.price)}</span>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <span className="cart-item-subtotal">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Ringkasan Belanja</h3>
          <div className="summary-row">
            <span>Subtotal ({items.length} produk)</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Ongkos Kirim</span>
            <span className={shippingCost === 0 ? 'free-shipping' : ''}>
              {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
            </span>
          </div>
          {shippingCost > 0 && (
            <p className="shipping-note">
              Belanja Rp{((200000 - totalPrice) / 1000).toFixed(0)}rb lagi untuk gratis ongkir!
            </p>
          )}
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <button className="btn-checkout" onClick={() => navigate('/checkout')}>
            Lanjut ke Checkout
          </button>
          <button className="btn-continue" onClick={() => navigate('/products')}>
            Lanjut Belanja
          </button>
        </div>
      </div>
    </div>
  );
}
