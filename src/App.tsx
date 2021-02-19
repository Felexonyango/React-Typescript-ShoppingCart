import React,{useState} from 'react'
import {useQuery} from 'react-query'
import Item from './Items/Items'
import Cart from '../src/Cart/Cart'
import LinearProgress from '@material-ui/core/LinearProgress'
import Drawer from  '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcons from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import { Button } from '@material-ui/core'

export type CartItemsType={
id:number,
category:string,
image:string,
price:number,
title:string,
amount :number,
description:string
}

const getproducts =async ():Promise<CartItemsType[]>=>
await (await  fetch('https://fakestoreapi.com/products')).json();

const  App=()=>{
  const [openCart, setOpenCart]=useState(false)
  const [cartItems, setCartItems]=useState([] as CartItemsType[])
  const {data, isLoading,error} =useQuery<CartItemsType[]>(
    'products',
    getproducts
    
  )
  console.log(data) 
  const getTotalItems=(items:CartItemsType[])=>{
    items.reduce((ack:number, item)=>ack + item.amount, 0)
  }
  const handleAddToCart =(clickedItem:CartItemsType)=>{
    setCartItems(prev=>{
      const isItemInCart=prev.find(item=> item.id === clickedItem.id)
      if(isItemInCart){
      return prev.map(item=>
        item.id===clickedItem.id 
        ?
        {...item, amoun:item.amount + 1}
        : item
        )
      
      }
        // First time Item is added
        return [...prev ,{...clickedItem, amount:1}]
    })

  }
  const handleRemoveFromCart=(id:number)=>{
    setCartItems(prev =>(
      prev.reduce((ack,item )=>{
if(item.id===id){
  if(item.amount === 1) return ack ;
  return [...ack, {...item , amount:item.amount-1}];
}
else
{
  return [...ack, item ]
}
      },[] as CartItemsType[])
    ))

  }
  
  if(isLoading) return <LinearProgress/>
  if(error) return <div> Something went Wrong....</div>

return(
<div className="divs">
  <Drawer anchor="right"open={openCart}onClose={()=>setOpenCart(false)}>
   <Cart 
   cartItems={cartItems}
   addTocart={handleAddToCart}
   removeFromCart={handleRemoveFromCart}
   />
  </Drawer>
  <Button onClick={()=>setOpenCart(true)}>
    <Badge badgeContent ={1} {...getTotalItems(cartItems)}color="error">
    <AddShoppingCartIcons/>
    </Badge>
  </Button>
<Grid container spacing ={3}>
    {data ?.map(item=>(
      <Grid item key ={item.id} xs={12} sm={4}>
        <Item item={item}handleAddToCart={handleAddToCart}/>
      </Grid>
    ))}
  </Grid>

  </div>

); 
}
export default App;