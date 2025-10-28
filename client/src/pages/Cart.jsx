import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Alert from "../components/Alert";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../hooks/useAlert";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  const { alert, showAlert } = useAlert();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showAlert("Your cart is empty!", "error");
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Prepare order data
      const orderData = {
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity // Use actual quantity from cart
        })),
        totalAmount: getCartTotal(),
        customerName: 'Guest Customer', // You can add a form to collect this
        customerEmail: 'guest@example.com' // You can add a form to collect this
      };

      // Send order to backend
      const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      // Clear the cart after successful checkout
      clearCart();
      
      // Show success message with order ID
      showAlert(`Order placed successfully! Order ID: ${result.order_id}. Thank you for your purchase!`, "success", 6000);
      
      // Optionally redirect to a success page after delay
      setTimeout(() => {
        navigate('/');
      }, 4000);
      
    } catch (error) {
      console.error('Checkout error:', error);
      showAlert("Checkout failed. Please try again.", "error");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {alert && <Alert {...alert} />}
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back to Products Button */}
          <button
            onClick={() => navigate('/products')}
            className="mb-6 text-yellow-600 hover:text-yellow-700 font-medium flex items-center transition-colors"
          >
            ← Continue Shopping
          </button>

          <h1 className="text-4xl font-bold text-yellow-600 mb-8 text-center">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M9 9h6"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any snacks to your cart yet.</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-8">
                {cartItems.map((snack, index) => (
                  <CartItem key={`${snack.id}-${index}`} snack={snack} onRemove={removeFromCart} />
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-gray-50 rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cartItems.length}):</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span className="text-yellow-600">₹{getCartTotal()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/products')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
