import React, { useRef, useState } from 'react'
import CartItemComponents from '../components/CartItemComponents';
import { useSelector } from 'react-redux';

function CarProductPage() {
    const [dataCoupon, setdataCoupon] = useState('');
    const { cart, totalPrice } = useSelector(state => state.cartStore);

    let coupon = useRef('');

    function handleCoupon() {
        setdataCoupon(coupon.current.value);
    }

    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex gap-8 mt-[50px]'>
                    <div className='=w-[60%]  flex flex-col gap-5'>
                        {!cart.lenght >= 1 ? cart.map((el, index) => {
                            return <CartItemComponents key={el.id} item={el} index={index} />
                        }) : <h2 className='text-center font-bold text-mainBlue text-4xl uppercase'>No Product in Cart</h2>}


                    </div>

                    <div className='w-[40%]'>
                        <h3>Total Price: ${dataCoupon === 'alphacode' ? totalPrice / 2 : totalPrice}</h3>

                        <div className='mt-[20px] flex flex-col gap-5'>
                            <p>Use this promo code <span className='text-mainYellow font-bold text-{14px]'>alphacode</span> for 50 discount!</p>
                            <input
                                ref={coupon}
                                type="text"
                                placeholder='Insert cupon..'
                                className='border border-mainBlue rounded-[20px] px-[24px] py-[12px] outline-none'
                            />
                            <button
                                className='bg-mainBlue rounded-[20px] px-[24px] py-[12px] text-white'
                                onClick={handleCoupon}>
                                Use Coupon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarProductPage