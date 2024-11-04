import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation: React.FC = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>('mpesa');
    const navigate = useNavigate();


    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPayment(event.target.value);
    };

    const handlePlaceOrder = () => {
    // Redirect based on selected payment method
    switch (selectedPayment) {
      case 'mpesa':
        navigate('/checkout/mpesa');
        break;
      case 'kcb':
        navigate('/checkout/kcb');
        break;
      case 'card':
        navigate('/checkout/credit-card');
        break;
      case 'giftcard':
        navigate('/checkout/gift-card');
        break;
      default:
        alert('Please select a payment method');
    }
  };


    return (
        <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Section */}
          <div className="p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">Pay with</h2>
            <div className="space-y-4">
              {[
                { label: 'Credit or debit using KCB', value: 'kcb', logo: 'path-to-kcb-logo.png' },
                { label: 'Safaricom M-Pesa', value: 'mpesa', logo: 'path-to-mpesa-logo.png' },
                { label: 'Credit or debit card', value: 'card', logo: 'path-to-card-logo.png' },
                { label: 'Our digital gift card', value: 'giftcard', logo: 'path-to-giftcard-logo.png' },
              ].map((option) => (
                <div key={option.value} className="flex items-center gap-4 p-3 border rounded">
                  <input
                    type="radio"
                    id={option.value}
                    name="payment"
                    value={option.value}
                    checked={selectedPayment === option.value}
                    onChange={handlePaymentChange}
                    className="h-5 w-5"
                  />
                  <img src={option.logo} alt={option.label} className="h-8 w-auto" />
                  <label htmlFor={option.value} className="flex-1">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
  
          {/* Place Order Section */}
          <div className="p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">Place order</h2>
            <p className="text-lg mb-4">Your order total is KES 39,000.</p>
            <p className="text-sm mb-4">Select a payment method, and then place your order.</p>
            <p className="text-xs mb-4">
              By placing an order you agree to the <a href="#" className="text-blue-500 underline">terms and conditions</a>.
            </p>
            <button className="w-full bg-purple-500 text-white py-2 rounded" onClick={handlePlaceOrder}>
              Place order
            </button>
          </div>
        </div>
  
        {/* Order Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Order Contents */}
          <div className="p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">Order contents</h2>
            <table className="w-full border-t border-gray-300">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium">Item</th>
                  <th className="text-left p-2 font-medium">Quantity</th>
                  <th className="text-left p-2 font-medium">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 flex items-center">
                    <img src="path-to-laptop-image.png" alt="Lenovo IdeaPad" className="h-16 w-16 object-cover mr-4" />
                    <div>
                      <a href="#" className="text-blue-600 underline">
                        Lenovo IdeaPad Celeron 8GB 256GB SSD 14" Win 11
                      </a>
                    </div>
                  </td>
                  <td className="p-2">1</td>
                  <td className="p-2 font-bold">KES 39,000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-bold">Basket total:</td>
                  <td></td>
                  <td className="p-2 font-bold">KES 39,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Delivery:</td>
                  <td></td>
                  <td className="p-2">KES 0</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Order total:</td>
                  <td></td>
                  <td className="p-2 font-bold">KES 39,000</td>
                </tr>
              </tfoot>
            </table>
          </div>
  
          {/* Delivery Address */}
          <div className="p-6 border rounded">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delivery address</h2>
              <a href="#" className="text-blue-600 underline text-sm">Edit</a>
            </div>
            <p className="mb-2"><strong>Collect from:</strong> TBC Kisumu</p>
            <p className="mb-2"><strong>Contact:</strong></p>
            <p>Phone: +254113120575</p>
            <p>Email: cassandralelei013@gmail.com</p>
            <p className="mt-4"><strong>KRA PIN:</strong> A019445533V</p>
          </div>
        </div>
      </div>
    );
};


export default Confirmation;