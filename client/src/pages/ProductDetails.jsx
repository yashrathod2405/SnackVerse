import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../hooks/useAlert";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { alert, showAlert, hideAlert } = useAlert();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details from backend
    fetch(`http://127.0.0.1:8000/api/snacks/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showAlert(`Added ${quantity} ${product.name}(s) to cart!`, 'success');
    }
  };

  const handleBackToProducts = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="flex flex-col justify-center items-center py-20">
            <p className="text-xl text-gray-500 mb-4">
              {error || "Product not found"}
            </p>
            <button
              onClick={handleBackToProducts}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back button */}
          <button
            onClick={handleBackToProducts}
            className="mb-6 text-yellow-600 hover:text-yellow-700 font-medium flex items-center transition-colors"
          >
            ← Back to Products
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="lg:w-1/2">
              {product.image ? (
                <div className="w-full h-96 lg:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full h-96 lg:h-[500px] flex items-center justify-center bg-gray-200 rounded-lg">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
              <p className="text-3xl font-bold text-yellow-600 mb-8">₹{product.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <label className="font-semibold text-gray-700 text-lg">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center py-2 border-0 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBackToProducts}
                  className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
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

export default ProductDetails;
