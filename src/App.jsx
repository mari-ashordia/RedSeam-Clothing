import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LogInPage } from './pages/LogInPage'
import { Header } from './components/Header'
import { ProductsListPage } from './pages/ProductsListPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { useStore } from './store/useStore'
import { CartDrawer } from './components/cartDrawer'
import { CheckoutPage } from './pages/CheckoutPage'
import { CongratsModal } from './components/CongratsModal'
import { LoadingWrapper } from './components/atoms/LoadingWrapper'

function App() {
  const isCartOpen = useStore(state => state.isCartOpen);
  const isCongratsOpen = useStore(state => state.isCongratsOpen);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = "/" element = {<ProductsListPage />}/>
        <Route path = "/products/:id" element = {<ProductDetailsPage />}/>
        <Route path = "/register" element = {<RegisterPage />} />
        <Route path = "/login" element = {<LogInPage />}/>
        <Route path = "/checkout" element = {<CheckoutPage />}/>
      </Routes>
      {isCartOpen && <CartDrawer />}
      {isCongratsOpen && <CongratsModal />}
    </BrowserRouter>
  )
}

export default App
