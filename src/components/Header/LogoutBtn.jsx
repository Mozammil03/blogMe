import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth.js"
import {logOut } from "../../store/AuthSlice.js"
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

    const lougoutHandler = () => {
        authService.logout().then(() => {
          dispatch(logOut());
          navigate('/login');
          
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-red-500 bg-orange-100 shadow-xl hover:text-orange-50 rounded-xl md:sm:rounded-2xl'
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn