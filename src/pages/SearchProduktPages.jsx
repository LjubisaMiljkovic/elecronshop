import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchProductsHandler } from '../store/productSlice'
import { useNavigate } from 'react-router-dom'
import SingleCardComponents from '../components/SingleCardComponents'


function SearchProduktPages() {
  const {search} = useSelector(state => state.productStore)
  const {products} = useSelector(state => state.productStore)
  const dispatch = useDispatch()
  const {productSearches} = useSelector(state => state.productStore)
  const navigation = useNavigate()
  

  useEffect (()=> {
 
  //pretraga
 products
  .filter((val)=>{if(val.title.includes(search)){
   dispatch(searchProductsHandler(val));
   }})
},[])


  return (


    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[50px] gap-3 place-items-center'>
{console.log(productSearches)}
      {productSearches ? productSearches.map(e => {return  <SingleCardComponents key={e.id} product={e}/>
      } )
    
          : navigation('/')}
 
  </div></div>
  )
}

export default SearchProduktPages

