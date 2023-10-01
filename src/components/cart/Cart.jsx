import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import LinkButton from '../ui/LinkButton';
import CartItem from './../cart/CartItem'
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart'


const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const dispatch = useDispatch()
  const username = useSelector(store => store.user.username)
  // const cart = fakeCart;
  const cart = useSelector(getCart);


  if(!cart.length) return <EmptyCart />

  return (
    <div className='flex flex-col gap-6 text-left p-4'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200 border-b'>
        {cart.map( item => {
          return (
            <CartItem item={item} key={item.id} />
          )
        })}
      </ul>

      <div className='flex gap-6'>
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
