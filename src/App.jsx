import './App.css'
import Menu, {loader as menuLoader} from './components/menu/Menu'
import Cart from './components/cart/Cart'
import CreateOrder, {action as createOrderAction} from './components/order/CreateOrder'
import Order, {loader as orderLoader} from './components/order/Order'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/ui/Home'
import AppLayout from './components/ui/AppLayout'
import Error from './components/ui/Error'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction
      },
      {
        path: 'order/:orderId',
        element:<Order />,
        loader: orderLoader
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
