// Test ID: IIDSAT
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from './OrderItem'

import { useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../helpers";

function Order() {
  const order = useLoaderData()

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between flex-wrap mb-4">
        <h2 className="text-xl font-semibold text-stone-500 capitalize">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-400 rounded-full py-1 px-3 text-xs uppercase font-semibold text-red-50">Priority</span>}
          <span className="bg-green-400 rounded-full py-1 px-3 text-xs uppercase font-semibold text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-orange-100 px-6 py-5 mb-4 rounded-md">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200">
        {cart.map(item => <OrderItem key={item.id} item={item} />)}
      </ul>

      <div className="text-left bg-orange-100 p-6 my-8 rounded-md">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-medium text-stone-600">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

//Order Loader
export async function loader({params}){
  const order = await getOrder(params.orderId)
  return order
}

export default Order;
