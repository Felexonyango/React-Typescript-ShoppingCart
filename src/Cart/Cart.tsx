import React from 'react'
import CartItems from '../Cart/CartItems'
import {CartItemsType} from '../App'
import '../Cart/Cart.css'


type Props={

    cartItems:CartItemsType[];
    addTocart:(clickedItem:CartItemsType)=>void
    removeFromCart:(id:number)=>void

}
const Cart =({cartItems,addTocart,removeFromCart}:Props)=>{
const calculateTotal=(items:CartItemsType[])=>
items.reduce((ack:number ,item )=>ack+item.amount *item.price, 0)

return(
    <div>
<h2>Your shopping Cart</h2>
{cartItems.length===0 ? <p>No items in the cat</p>:null}
 {cartItems.map(item=>(
     <CartItems
     key={item.id}
     item={item}
     addTocart={addTocart}
     removeFromCart={removeFromCart}
     />
 ))}
 <h2>Total :${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
)

}
export default Cart;