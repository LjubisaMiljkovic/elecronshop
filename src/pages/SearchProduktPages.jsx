import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSearchProduct, searchProductsHandler } from '../store/productSlice'
import ProductPages from '../pages/ProductPages'
import ProductService from '../services/productService'


function SearchProduktPages() {
  const {search} = useSelector(state => state.productStore)
  const {products} = useSelector(state => state.productStore)
  const dispatch = useDispatch()
  const {productSearches} = useSelector(state => state.productStore)
  

  useEffect (()=> {
 
  //pretraga
 products
  .filter((val)=>{if(val.title.includes(search)){
   dispatch(searchProductsHandler(val));
   }})
},[])



  return (


    <div className='container mx-auto'>
{console.log(productSearches)}
      {productSearches ? productSearches.map(e => {return <div className='flex flex-col w-[300px] border border-mainBlue p-3 rounded-[20px]'>
         <img src={e.thumbnail} alt={e.title} className='w-[300px] h-[200px] rounded-[20px] object-cover ' />

         <div className='flex flex-col grow'>
             <h3 className='text-center mt-2 font-bold'>{e.title}</h3>
             <p className='mb-5 text-center'>${e.price}</p>
             <p className='text-[14px] flex grow'>{e.description.slice(0, 50)}...</p>
         </div>

         <Link
             to={`/productDetails/${e.id}`}
             className='px-5 py-2 bg-mainBlue text-white rounded-full text-center mt-[10px] hover:scale-105 transition-all duration-75'  > See more</Link>
     </div>} )
    
          : <ProductPages/>}
    {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[50px] gap-3 place-items-center'>
    
      {(searchProduct) ? <SingleCardComponents key={searchProduct.id} product={searchProduct} /> : 
       <div className='container mx-auto'>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[50px] gap-3 place-items-center'>
       
         {products.map(product => {
           return <SingleCardComponents key={product.id} product={product} />
         })}

       </div>
     </div>}

    </div> */}
  </div>
  )
}

export default SearchProduktPages