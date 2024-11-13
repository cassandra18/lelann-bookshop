import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/orderSummary";

const CheckoutPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email); // Save email to localStorage
    navigate("/checkout/shipping-address"); // Navigate to the next step
  };


  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-6xl p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New User Section */}
          <div className="col-span-1 border border-sunset-transparent p-6 rounded-md ">
            <h2 className="text-2xl font-bold mb-4 text-sunset">New to Lelann bookshop</h2>
            <p className="mb-4">Just enter your email to get started</p>
            <form onSubmit={handleNewUserSubmit}>
              <label className="block mb-2" htmlFor="new-email" style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal" }}>
                Email address *
              </label>
              <input
                type="email"
                id="new-email"
                className="w-full p-2 rounded-sm mb-4 bg-gray-800 border border-sunset-transparent"
                style={{ fontFamily: "Kanit, sans-serif", fontWeight: "200" }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md"
                style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal" }}
              >
                Continue
              </button>
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
          <OrderSummary/>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
