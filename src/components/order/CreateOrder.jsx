import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCard from "./../cart/EmptyCart"
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)

  // const cart = fakeCart;
  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice


  const username = useSelector(store => store.user.username)

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  //Get data/errors from action
  const formErrors = useActionData()

  if(!cart.length) return <EmptyCard />

  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold text-yellow-500">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new" className="flex flex-col gap-4 w-3/4 mx-auto text-left">

        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input className="input" defaultValue={username} type="text" name="customer" required />
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className="text-red-300 text-xs font-medium tracking-wide">{formErrors.phone}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name='cart' value={JSON.stringify(cart)} />
          {/* <button className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 py-2 px-6 my-4 text-white font-semibold text-lg rounded-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-1 cursor-pointer disabled:cursor-not-allowed" disabled={isSubmitting}>{isSubmitting ? 'Placeing Order...' :'Order now'}</button> */}
          <Button type='primary' disabled={isSubmitting}>
          {isSubmitting ? 'Placing Order...' :`Order now from €${totalPrice}  `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//React automatically runs the action function when the Form is submitted
export async function action({request}){
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on'
  }
  // console.log(order);

  //Errors
  const errors = {}
  if(!isValidPhone(order.phone)){
    errors.phone = 'Please give us the correct number'
  }

  if(Object.keys(errors).length > 0){
    return errors
  }

  const newOrder = await createOrder(order)
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}


export default CreateOrder;
