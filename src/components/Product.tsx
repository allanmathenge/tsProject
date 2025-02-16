import React, { ReactElement, memo } from 'react'

import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from '../context/CartProvider'

type PropsType = {
    product: ProductType,
    dispatch: React.ActionDispatch<[action: ReducerAction]>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement => {

    // const img: string = require(`../images/${prompt.sku}.jpeg`)
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 }})
    const itemInCart = inCart ? ' Item in Cart ✔' : null
    const content = (
        <article className='product'>
            <h3 className="">{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart} className="">Add to Cart</button>
        </article>
    )

  return content
}

function areProductsEqual({ product: prevProduct, inCart: prevIncart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return (
        Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
        }) && prevIncart === nextInCart
    )
}

const memoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default memoizedProduct