import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../hooks/useAlert";

const SnackList = () => {
  const [snacks, setSnacks] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/snacks/")
      .then((res) => res.json())
      .then((data) => setSnacks(data))
      .catch((err) => console.error("Error fetching snacks:", err));
  }, []);

  const handleViewProduct = (snackId) => {
    navigate(`/products/${snackId}`);
  };

  const handleAddToCart = (snack) => {
    addToCart(snack);
    showAlert(`${snack.name} added to cart!`, 'success');
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Featured Snacks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {snacks.slice(0, 6).map((snack) => (
          <div
            key={snack.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {snack.image && (
              <div 
                className="cursor-pointer"
                onClick={() => handleViewProduct(snack.id)}
              >
                <img
                  src={`http://127.0.0.1:8000${snack.image}`}
                  alt={snack.name}
                  className="w-full h-48 object-contain rounded bg-gray-100 hover:opacity-90 transition-opacity"
                  style={{ maxHeight: "12rem", maxWidth: "100%" }}
                />
              </div>
            )}
            <div className="mt-4">
              <h3 
                className="text-xl font-semibold cursor-pointer hover:text-yellow-600 transition-colors"
                onClick={() => handleViewProduct(snack.id)}
              >
                {snack.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">{snack.description}</p>
              <p className="text-yellow-600 font-bold mt-3 text-lg">₹{snack.price}</p>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleViewProduct(snack.id)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCart(snack)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {snacks.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/products')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View All Products
          </button>
        </div>
      )}
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

export default SnackList;
