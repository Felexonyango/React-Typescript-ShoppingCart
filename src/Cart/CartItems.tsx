import Button from  '@material-ui/core/Button'
import React from 'react'
import {CartItemsType} from '../App'
// styles 
import  './CartItems.css'
type Props={

    item:CartItemsType;
    addTocart:(clickedItem:CartItemsType)=>void
    removeFromCart:(id:number)=>void
}
const CartItems =({item,addTocart,removeFromCart}:Props)=>{

return(
  <div className="app">
 <h3>{item.title}</h3>
 <div className="information">
     <p>Price:${item.price}</p>
     <p>Total:${(item.amount * item.price).toFixed(2)}</p>
 </div>
 <div className="button">
     <Button
     size="small"
     disableElevation
     variant="contained"
     onClick={()=>removeFromCart(item.id)}>
         -
     </Button>


 </div>
 <p>{item.amount}</p>
 <div className="button">
     <Button
     size="small"
     disableElevation
     variant="contained"
     onClick={()=>addTocart(item)}>
         +
     </Button>


 </div>
 <img src={item.image}alt ={item.title}className="img"/>
    </div>
)

}
export default CartItems;
