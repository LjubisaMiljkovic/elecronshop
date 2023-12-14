import React from 'react'

function InputComponents() {
  return (
    <div className='bg-white rounded-[20px] overflow-hidden hidden md:flex'>
        <input type='text' placeholder='Search Product' className='pl-[25px] py-[17px]'/>
        <button  className='bg-mainYellow text-white px-[30px] rounded-[20px]'>Search</button>
    </div>
  )
}

export default InputComponents