import React, { useEffect, useState } from "react"
import ProductItem from "../ProductItem/ProductItem"
import { useTelegram } from "../../hooks/useTelegram"
import './ProductList.css'

const products = [
  {id: "1", title: 'Iphone 13', price: 67000, description: 'Красный цвет'},
  {id: "2", title: 'Iphone 13 Pro', price: 80000, description: 'Черный цвета'},
  {id: "3", title: 'Iphone 14', price: 75000, description: 'Белый цвет'},
  {id: "4", title: 'Iphone 14 Pro', price: 92000, description: 'Фиолетовый цвет'},
  {id: "5", title: 'Iphone 14 Pro Max', price: 115000, description: 'Фиолетовый цвет'},
  {id: "6", title: 'Iphone 15', price: 810000, description: 'Голубой цвет'},
  {id: "7", title: 'Iphone 15 Pro', price: 93000, description: 'Белый цвет'},
  {id: "8", title: 'Iphone 15 Pro Max', price: 120000, description: 'Белый цвет'},
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([])
  const tg = useTelegram()

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    useEffect(() => {
      if(newItems.length === 0) {
        tg.MainButton.hide()
      } else {
        tg.MainButton.show()
        tg.MainButton.setParams({
          text: `Купить ${getTotalPrice(newItems)}`
        })
      }
    })

    // if(newItems.length === 0) {
    //   tg.MainButton.hide()
    // } else {
    //   tg.MainButton.show()
    //   tg.MainButton.setParams({
    //     text: `Купить ${getTotalPrice(newItems)}`
    //   })
    // }
  }
  
  return (
    <>
      <div className={'list'}>
        {products.map((item) => (
          <ProductItem 
            product={item}
            onAdd={onAdd}
            className={'item'}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList;