import React, { useEffect } from 'react'
import { deleteSearchProduct, searchHandler } from '../store/productSlice';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';



function InputComponents() {
  const {search} = useSelector(state => state.productStore)
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    dispatch(deleteSearchProduct());
   
   },[])

  function handleInput(event) {
    dispatch(searchHandler(event.target.value))
  
   }

  
  return (
    <div className='bg-white rounded-[20px] overflow-hidden hidden md:flex'>
        <input type='search' placeholder='Search Product' className='pl-[25px] py-[17px]'  onChange={(event) => handleInput(event)}/>
        <Link to='/search'
        className='bg-mainYellow text-white px-[30px] rounded-[20px] text-center pt-3'
       >Search</Link>
    </div>
  )
}

export default InputComponents