import React from 'react'
import CartItemComponents from '../components/CartItemComponents';
import { useSelector } from 'react-redux';

function CarProductPage() {
    const { cart, totalPrice } = useSelector(state => state.cartStore);

    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex gap-8'>
                    <div className='=w-[60%] mt-[50px]'>
                        {!cart.lenght >= 1 ? cart.map((el, index) => {
                            return <CartItemComponents key={el.id} item={el} index={index} />
                        }) : <h2 className='text-center font-bold text-mainBlue text-4xl uppercase'>No Product in Cart</h2>}


                    </div>

                    <div className='w-[40%]'>
                        <h3>Total Price: ${totalPrice}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarProductPage