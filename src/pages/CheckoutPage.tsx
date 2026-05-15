import { useState, type ReactNode } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/format';
import {
  ShieldCheckIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  BanknotesIcon,
} from '../components/Icons';

interface CheckoutPageProps {
  navigate: (path: string) => void;
}

interface PaymentOption {
  value: string;
  label: string;
  icon: ReactNode;
}

export default function CheckoutPage({ navigate }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    payment: 'transfer',
  });

  const paymentOptions: PaymentOption[] = [
    { value: 'transfer', label: 'Transfer Bank', icon: <BuildingLibraryIcon size={20} /> },
    { value: 'ewallet', label: 'E-Wallet', icon: <DevicePhoneMobileIcon size={20} /> },
    { value: 'cod', label: 'COD (Bayar di Tempat)', icon: <BanknotesIcon size={20} /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="empty-state page-empty">
        <span className="empty-icon"><ShieldCheckIcon size={56} /></span>
        <h2>Silakan Login Terlebih Dahulu</h2>
        <p>Anda perlu login untuk melanjutkan checkout.</p>
        <button className="btn-primary" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="empty-state page-empty">
        <span className="empty-icon"><ShoppingCartIcon size={56} /></span>
        <h2>Keranjang Kosong</h2>
        <p>Tambahkan produk terlebih dahulu sebelum checkout.</p>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          Belanja Sekarang
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <span className="success-icon"><CheckCircleIcon size={64} /></span>
        <h2>Pesanan Berhasil!</h2>
        <p>Terima kasih telah berbelanja di GSHOP. Pesanan Anda sedang diproses.</p>
        <p className="order-id">Order ID: #TK{Date.now().toString().slice(-8)}</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Kembali ke Home
        </button>
      </div>
    );
  }

  const shippingCost = totalPrice >= 200000 ? 0 : 15000;
  const grandTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <div className="form-section">
            <h3>Alamat Pengiriman</h3>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Alamat Lengkap</label>
              <textarea
                id="address"
                required
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Kota</label>
                <input
                  id="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Kota"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Kode Pos</label>
                <input
                  id="postalCode"
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Metode Pembayaran</h3>
            <div className="payment-options">
              {paymentOptions.map((opt) => (
                <label key={opt.value} className={`payment-option ${form.payment === opt.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={(e) => updateField('payment', e.target.value)}
                  />
                  {opt.icon}
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Ringkasan Pesanan</h3>
          <div className="checkout-items">
            {items.map((item) => (
              <div key={item.product.id} className="checkout-item">
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <span className="item-name">{item.product.name}</span>
                  <span className="item-qty">{item.quantity}x {formatPrice(item.product.price)}</span>
                </div>
                <span className="item-total">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Ongkos Kirim</span>
            <span className={shippingCost === 0 ? 'free-shipping' : ''}>
              {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
            </span>
          </div>
          <div className="summary-total">
            <span>Total Pembayaran</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <button type="submit" className="btn-place-order">
            Bayar Sekarang
          </button>
        </div>
      </form>
    </div>
  );
}
