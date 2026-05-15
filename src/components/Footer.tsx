export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🛒 TokoKu</h3>
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
            <li>📧 support@tokoku.com</li>
            <li>📞 (021) 1234-5678</li>
            <li>📍 Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 TokoKu. All rights reserved.</p>
      </div>
    </footer>
  );
}
