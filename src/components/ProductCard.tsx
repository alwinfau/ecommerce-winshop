import type { Product } from '../types';
import { formatPrice, getDiscount } from '../utils/format';
import { useCart } from '../context/CartContext';
import { StarSolidIcon, StarOutlineIcon, PlusIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span className="stars">
      {Array.from({ length: full }, (_, i) => (
        <StarSolidIcon key={`f${i}`} size={14} className="star-filled" />
      ))}
      {Array.from({ length: empty }, (_, i) => (
        <StarOutlineIcon key={`e${i}`} size={14} className="star-empty" />
      ))}
    </span>
  );
}

export default function ProductCard({ product, navigate }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {product.badge && (
        <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </span>
      )}
      <div
        className="product-image"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3
          className="product-name"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="product-rating">
          <RatingStars rating={product.rating} />
          <span className="rating-text">({product.reviewCount})</span>
        </div>
        <div className="product-pricing">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="product-original-price">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="product-discount">
                -{getDiscount(product.originalPrice, product.price)}%
              </span>
            </>
          )}
        </div>
        <button
          className="btn-add-cart"
          onClick={() => addToCart(product)}
        >
          <PlusIcon size={14} /> Keranjang
        </button>
      </div>
    </div>
  );
}

export { RatingStars };
