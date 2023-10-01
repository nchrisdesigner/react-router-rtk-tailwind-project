import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../helpers";
import Button from './../ui/Button'
import { addItem, getCurrentQuantityById, getTotalCartQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex  gap-4 text-left py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />

      <div className="flex flex-col grow">

        <p className={`text-xl font-semibold ${soldOut ? 'line-through text-stone-400' : ''}`}>{name}</p>

        <p className={`text-stone-600 italic capitalize ${soldOut ? 'line-through text-stone-400' : ''}`}>{ingredients.join(', ')}</p>

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-400">Sold out</p>}

          {!soldOut && isInCart && 
          <div className="flex gap-4">
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
            <DeleteItem pizzaId={id} />
          </div> }

          {!soldOut && !isInCart && <Button onClick={handleAddToCart} type='small'>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
