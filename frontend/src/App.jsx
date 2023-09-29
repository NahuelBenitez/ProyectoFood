import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import toast, {Toaster} from 'react-hot-toast'
import NewProduct from "./pages/NewProduct";
//import { Store } from "redux";
//import { Provider } from "react-redux";
function App() {
  

  return (
    <>
  <Toaster />
   <BrowserRouter>
   <Header />
   
   <Routes>
    <Route path="/" element={ <Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/products" element={<Products />}/>
    <Route path="/newproduct" element={<NewProduct />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/about" element={<About/>} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Navigate replace to="/" />} />
   </Routes>
   </BrowserRouter>

   <Footer />
    </>
  )
}

export default App
