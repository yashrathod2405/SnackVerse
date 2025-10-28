const CartItem = ({ snack, onRemove }) => (
  <div className="border rounded-lg p-4 mb-4 flex items-center justify-between bg-white shadow-sm">
    <div className="flex items-center space-x-4">
      {snack.image && (
        <img
          src={typeof snack.image === 'string' && snack.image.startsWith('http') 
            ? snack.image 
            : `http://127.0.0.1:8000${snack.image}`}
          alt={snack.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}
      <div>
        <h3 className="font-semibold text-lg">{snack.name}</h3>
        <p className="text-gray-600">Quantity: {snack.quantity}</p>
        <p className="text-yellow-600 font-bold">₹{snack.price} each</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-lg">₹{snack.price * snack.quantity}</p>
      <button 
        onClick={() => onRemove(snack.id)} 
        className="text-red-600 hover:text-red-800 mt-2 px-3 py-1 border border-red-300 rounded hover:bg-red-50"
      >
        Remove
      </button>
    </div>
  </div>
);

export default CartItem;
