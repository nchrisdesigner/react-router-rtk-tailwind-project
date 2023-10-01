import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../helpers";

function CartOverview() {
  // const totalCartQuantity = useSelector(store => store.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0 ))
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if(!totalCartQuantity) return null

  return (
    <div className="bg-stone-800 flex justify-between items-center px-4 py-4 sm:py-6 text-sm sm:text-base">
      <p className="text-white flex gap-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>${formatCurrency(totalCartPrice)}</span>
      </p>
      <Link className="text-white" to='/cart'>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
