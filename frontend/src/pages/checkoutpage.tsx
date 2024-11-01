import React from "react";
import { useCart } from "../components/cart-functionality";
import { Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const { state } = useCart();

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-6xl p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New User Section */}
          <div className="col-span-1 border border-sunset-transparent p-6 rounded-md ">
            <h2 className="text-2xl font-bold mb-4 text-sunset">New to Lelann bookshop</h2>
            <p className="mb-4">Just enter your email to get started</p>
            <form>
              <label className="block mb-2" htmlFor="new-email" style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
                Email address *
              </label>
              <input
                type="email"
                id="new-email"
                className="w-full  p-2 rounded-sm mb-4 bg-gray-800 border border-sunset-transparent"
                style={{ fontFamily: "Kanit, sans-serif", fontWeight: "200", }}
                placeholder="Enter your email"
              />
              <div className="flex items-start mb-4">
                <input type="checkbox" id="privacy-checkbox" className="mr-2" />
                <label htmlFor="privacy-checkbox" className="text-sm" style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
                  We value your privacy. By checking this box, you agree to
                  receive occasional emails about our products and services. You
                  can unsubscribe at any time.
                </label>
              </div>
              <Link to="/checkout/shipping-address">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md"
                style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}
              >
                Continue
              </button>
              </Link>
            </form>
          </div>

          {/* Existing Customers Section */}
          <div className="col-span-1 border p-6 rounded-md border-sunset-transparent">
            <h2 className="text-2xl font-bold mb-4 text-sunset">Existing customers</h2>
            <p className="mb-4">Login if you have an account with us</p>
            <form>
              <label className="block mb-2" htmlFor="login-email" style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
                Email address *
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full border p-2 rounded-sm mb-4 bg-gray-800 border-sunset-transparent"
                style={{ fontFamily: "Kanit, sans-serif", fontWeight: "200", }}
                placeholder="Enter your email"
              />
              <label className="block mb-2" htmlFor="password" style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="w-full border p-2 rounded-sm mb-4 bg-gray-800 border-sunset-transparent"
                style={{ fontFamily: "Kanit, sans-serif", fontWeight: "200", }} 
                placeholder="Enter your password"
              />
              <a href="#" className="text-blue-600 text-sm block mb-4" style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
                Forgotten your password?
              </a>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md"
                style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}
              >
                Login
              </button>
            </form>
            <div className="mt-4">
              <button className="w-full bg-white border rounded-md flex items-center justify-center  gap-2 p-2 text-prussian-blue"
              style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}
              >
                <img
                  src={"/images/google.png"}
                  alt="Google Logo"
                  className="h-5"
                />
                Sign in with Google
              </button>
              <button className="w-full bg-white text-prussian-blue border  rounded-md gap-2 p-2 flex items-center justify-center  mt-2"
              style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}
              >
                <img
                  src={"/images/facebook.png"}
                  alt="Facebook Logo"
                  className="h-5"
                />
                Sign in with Facebook
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="col-span-1 border p-6 rounded-lg border-sunset-transparent">
            <button className="w-full border border-red-500 text-red-500 p-2 rounded-sm mb-4"
            style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
              Add a voucher code
            </button>
            <div className="border-t pt-4">
              <h2 className="text-2xl font-bold mb-4 text-sunset">Your order</h2>
              {state.items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div>
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover"
                      />
                      <div className="flex-grow ml-4">
                        <h2 className="text-blue-600 " style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>{item.name}</h2>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lg font-bold">
                        KES {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-sunset">Total:</span>
                      <span className="text-lg font-bold">
                        KES{" "}
                        {state.items.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
