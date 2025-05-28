import Navbar from './components/navbar';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './components/cart-functionality';


function App() {
  return (
    <>
    
    <CartProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </CartProvider>
    </>
  )
}

export default App
