import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../hooks/useAlert";

const Products = () => {
  const [snacks, setSnacks] = useState([]);
  const [sortedSnacks, setSortedSnacks] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const { addToCart } = useCart();
  const { alert, showAlert, hideAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/snacks/")
      .then((response) => response.json())
      .then((data) => {
        setSnacks(data);
        setSortedSnacks(data);
      })
      .catch((error) => console.error("Error fetching snacks:", error));
  }, []);

  // Sort function
  const sortSnacks = (snacksToSort, option) => {
    const sorted = [...snacksToSort];
    
    switch (option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'default':
      default:
        return sorted.sort((a, b) => a.id - b.id);
    }
  };

  // Effect to handle sorting when sortOption or snacks change
  useEffect(() => {
    const sorted = sortSnacks(snacks, sortOption);
    setSortedSnacks(sorted);
  }, [snacks, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddToCart = (snack) => {
    addToCart(snack);
    showAlert(`${snack.name} added to cart!`, 'success');
  };

  const handleProductClick = (snackId) => {
    navigate(`/products/${snackId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <div className="bg-white py-10 px-4">
          <h1 className="text-4xl font-bold text-yellow-500 text-center mb-4">Our Snacks</h1>
          <p className="text-center text-gray-600 mb-8">Here's a variety of delicious snacks for every taste bud.</p>

          {/* Sort Dropdown */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  Showing {sortedSnacks.length} product{sortedSnacks.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-600 font-medium">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedSnacks.length > 0 ? (
              sortedSnacks.map((snack) => (
                <div key={snack.id} className="border rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer">
                  {snack.image && (
                    <div 
                      className="w-full h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-md overflow-hidden"
                      onClick={() => handleProductClick(snack.id)}
                    >
                      <img
                        src={`http://127.0.0.1:8000${snack.image}`}
                        alt={snack.name}
                        className="object-contain w-full h-full"
                        style={{ maxHeight: '12rem', maxWidth: '100%' }}
                      />
                    </div>
                  )}
                  <h2 
                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-yellow-600 transition-colors"
                    onClick={() => handleProductClick(snack.id)}
                  >
                    {snack.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 text-center">{snack.description}</p>
                  <p className="text-yellow-600 font-bold text-lg mb-2">₹{snack.price}</p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded transition-colors"
                      onClick={() => handleProductClick(snack.id)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded transition-colors"
                      onClick={() => handleAddToCart(snack)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No snacks found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={hideAlert}
          duration={alert.duration}
        />
      )}
    </div>
  );
};

export default Products;
