import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import UserService from '../services/userService'
import { useDispatch } from 'react-redux';
import { loggedUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';



function LoginPages() {

  const dispatch = useDispatch();

  const navigation = useNavigate();
  //formik

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string(),
      password: Yup.string(),
    }),

    onSubmit: (values) => {
      UserService.loggIn({ ...values, expiresInMins: 120 })
        .then(res => {
          if (res.status === 200) {
            toast.success("User successfully logged in")
            dispatch(loggedUser(res.data));
            setTimeout(() => navigation('/'), 2000)
          } else {
            toast.error('Invalid username or password');
          }
        })
        .catch(err => { toast.error(err.response.data.message) })


      formik.resetForm();
    }
  })

  const showError = (name) => formik.errors[name] && formik.tuched[name] && formik.errors[name];

  return (
    <div>
      <h2 className='text-center mt-[30px] text-mainBlue font-bold uppercase text-3xl'>Login Form</h2>

      <form onSubmit={formik.handleSubmit} className='border border-mainYellow w-[50%] mx-auto p-[20px] rounded-3xl flex flex-col items-center justify-center gap-5'>
        {/*username*/}
        <div className=' flex flex-col'>
          <label className='text-grayText text-[15px]'>UserName
            <span className='text-[13px] text-red-600 ml-[5px] '>{showError('username')}</span></label>
          <input
            type="text"
            placeholder='Insert username'
            className='border border-mainBlue rounded-md px-[16px] py-[8px]'
            onChange={formik.handleChange}
            name='username'
            value={formik.values.username} />
        </div>
        {/*password*/}
        <div className=' flex flex-col'>
          <label className='text-grayText text-[15px]'>Password
            <span className='text-[13px] text-red-600 ml-[5px] '>{showError('password')}</span></label>
          <input
            type="text"
            placeholder='Insert password'
            className='border border-mainBlue rounded-md px-[16px] py-[8px]'
            onChange={formik.handleChange}
            name='password'
            value={formik.values.password} />
        </div>

        <button type='submit' className='bg-mainYellow text-white px-[16px] py-[8px] rounded-xl cursor-pointer'>Login Me</button>
      </form>
    </div>
  )
}

export default LoginPages