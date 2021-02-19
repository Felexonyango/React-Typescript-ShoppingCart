import  Button  from '@material-ui/core/Button'
import {CartItemsType} from '../App'
//import {Wrapper} from '../Items/Items.style'
import './item.css'
import React from 'react'
type Props={
    item:CartItemsType
    handleAddToCart:(clickedItem:CartItemsType)=>void
}

const Item =({item, handleAddToCart}:Props)=>(
<div className="items">
<img src ={item.image}alt={item.title}className="image"/>
<div className="divs">
<h3>{item.title}</h3>
<p>{item.description}</p>
<h3>${item.price}</h3>
</div>
<Button onClick={()=>handleAddToCart(item)}className="Button">Add to cart</Button>
</div>

)
export default Item;