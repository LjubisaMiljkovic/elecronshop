import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductService from '../services/productService'
// icons
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { saveProductHandler } from '../store/cartSlice';
import { saveFavoriteHandler } from '../services/favoriteSlice';



function ProcuctDetailsPage() {

    const [quantity, satQuantity] = useState(0);
    
    const [product, setProduct] = useState({});
    const [currentImage, setCurrentImages] = useState(0)
    const [value, setValue] = useState(1)
    const [favoriteIcon, setfavoriteIcon] = useState(null)

    const dispatch = useDispatch()
    const { favorite } = useSelector(state => state.favoriteStore);
    

    let { id } = useParams();

    useEffect(() => {

        ProductService.getSingleProduct(id)
            .then(res => {
                setProduct(res.data)
                setValue(res.data.rating)

            })
            .catch(err => console.log(err))
    }, [])

    // favorite useEffect
    useEffect(() => {
        favorite.find((el) => {
            if (el.id === parseInt(id)) {
                console.log("ima u areju")
                // info
                setfavoriteIcon(el.id)
                return;
            } else {
                console.log("nema");
            }
        })
    }, [favorite])

    // ovde dodajemo u nas cardSlice
    function productHandler() {
        dispatch(saveProductHandler(product))
    }

    //Ovde cuvamo u favoriteSlice
    const favoriteHandler = () => {
        dispatch(saveFavoriteHandler(product))
    }

    // Quantity Calculator
    function quantityHandle(increment) {
        if (quantity >= 0) {
            if (quantity === 0 && increment === -1) {
                return
            } else { satQuantity(quantity + increment) }
        }
    }

    return (
        <div className='h-[100vh]'>
            <div className='container mx-auto flex mt-[50px] gap-[20px]'>
                {/*images*/}

                <div className='w-[50%] flex flex-col'>
                    <img src={product.images?.[currentImage]} alt="" className='w-full h-[500px] object-cover border-2 border-mainBlue rounded-[20px]' />

                    <div className='flex items-center justify-between mt-[20px]'>
                        {product.images?.map((img, index) => {
                            return <img key={index} src={img} className='w-[100px] h-[100px] border border-mainBlue p-2 rounded-[20px] cursor-pointer' onClick={() => setCurrentImages(index)} />
                        }
                        )}
                    </div>
                </div>
                {/* description*/}
                <div className='w-[50%]'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <h3 className='text-xl text-mainBlue'>{product.title}</h3>
                            <p className='text-xl '>${product.price}</p>

                        </div>
                        <div className='flex items-center'>
                            <p>Rating:</p>
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
                            </Stack>

                        </div>
                        <div className='flex items-center gap-[10px]'>
                            <p>Availability:</p>
                            {product.stock >= 1 ?
                                <div className='flex items-center  gap-2 text-green-500'>
                                    <FaCheck size={24} /> <span>In stock</span>
                                </div>
                                :
                                <div className='flex items-center  gap-2 text-red-500'><RxCross1 size={28} /><span>Out Of Stock</span>
                                </div>}
                        </div>
                        <h3>Hurry up! only <span className='font-bold'>{product.stock}</span> product left in stock</h3>
                    </div>
                    <div className='mt-[50px]'>
                        <h3 className='text-xl'>Total Price:<span className='text-mainBlue font-bold text-2xl'>{quantity * product.price}</span></h3>
                        {/*Componenta Quantiti */}

                        <div className='flex items-center'>
                            <p>Quantity:</p>
                            <button className='px-[8px] py-[4px] bg-slate-400' onClick={() => quantityHandle(1)}>+</button>
                            <span className='px-[8px] py-[4px] bg-slate-400'>{quantity}</span>
                            <button className='px-[8px] py-[4px] bg-slate-400' onClick={() => quantityHandle(-1)}>-</button>

                        </div>


                        <div className='flex items-center gap-5'>
                            <Link
                                to='/catrProduct'
                                className='bg-mainYellow px-[24px] py-[12px] rounded-full'
                                onClick={() => productHandler()}
                            >
                                Add to Cart
                            </Link>
                            <Link
                                to='/favoriteProducts'
                                className='bg-mainYellow px-[24px] py-[12px] rounded-full'
                                onClick={() => favoriteHandler()}
                            >{/* da dendlujem */}

                                {favoriteIcon === parseInt(id) ? <FaHeart size={32} color='red' /> : <CiHeart size={32} color='white' />}

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProcuctDetailsPage