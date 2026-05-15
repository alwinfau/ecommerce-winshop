import {
  ShoppingCartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-brand"><ShoppingCartIcon size={22} /> GSHOP</h3>
          <p>Marketplace terpercaya dengan produk berkualitas dan harga terbaik untuk semua kebutuhan Anda.</p>
        </div>
        <div className="footer-section">
          <h4>Kategori</h4>
          <ul>
            <li><a href="#/products?category=elektronik">Elektronik</a></li>
            <li><a href="#/products?category=fashion">Fashion</a></li>
            <li><a href="#/products?category=makanan">Makanan</a></li>
            <li><a href="#/products?category=rumah">Rumah & Living</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Informasi</h4>
          <ul>
            <li><a href="#/">Tentang Kami</a></li>
            <li><a href="#/">Kebijakan Privasi</a></li>
            <li><a href="#/">Syarat & Ketentuan</a></li>
            <li><a href="#/">Bantuan</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hubungi Kami</h4>
          <ul>
            <li className="contact-item"><EnvelopeIcon size={16} /> support@tokoku.com</li>
            <li className="contact-item"><PhoneIcon size={16} /> (021) 1234-5678</li>
            <li className="contact-item"><MapPinIcon size={16} /> Medan, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 GSHOP. All rights reserved.</p>
      </div>
    </footer>
  );
}
