import { useState, useMemo } from 'react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon } from '../components/Icons';
import CategoryIcon from '../components/CategoryIcon';

interface ProductsPageProps {
  navigate: (path: string) => void;
  params: Record<string, string>;
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function ProductsPage({ navigate, params }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(params.category || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const searchQuery = params.search || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>
          {searchQuery
            ? `Hasil pencarian: "${searchQuery}"`
            : selectedCategory !== 'all'
            ? categories.find((c) => c.slug === selectedCategory)?.name || 'Semua Produk'
            : 'Semua Produk'}
        </h1>
        <p>{filteredProducts.length} produk ditemukan</p>
      </div>

      <div className="products-layout">
        {/* Sidebar Filter */}
        <aside className="products-sidebar">
          <div className="filter-group">
            <h3>Kategori</h3>
            <ul className="filter-list">
              <li>
                <button
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedCategory('all')}
                >
                  Semua Produk
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategory === cat.slug ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat.slug)}
                  >
                    <CategoryIcon name={cat.icon} size={16} /> {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Harga</h3>
            <div className="price-filter">
              <label>
                Min: Rp{priceRange[0].toLocaleString('id-ID')}
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={50000}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
              </label>
              <label>
                Max: Rp{priceRange[1].toLocaleString('id-ID')}
                <input
                  type="range"
                  min={0}
                  max={2000000}
                  step={50000}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="products-main">
          <div className="products-toolbar">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="default">Urutkan: Default</option>
              <option value="price-low">Harga: Terendah</option>
              <option value="price-high">Harga: Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} navigate={navigate} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon"><MagnifyingGlassIcon size={56} /></span>
              <h3>Produk tidak ditemukan</h3>
              <p>Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
