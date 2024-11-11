import authService from "../appwrite/auth"
import {Link, Outlet, useNavigate} from "react-router-dom"
import React, {useState} from 'react'
import Button from "./Button"
import Input from './Input'
import Logo from "./Logo"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {logIn} from "../store/AuthSlice"

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const handleAlternateSignUp = () => {
      navigate("step1"); // Navigate to the nested route `step1` within `signup`
    };

    const create = async (data) => {
        setError("")
        try {
            // console.log(data);
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(logIn({userData}))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
      <div className="flex items-center justify-center text-orange-950  ">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border shadow-xl border-black/10`}
        >
          <div className="mb-2 flex justify-center text-5xl ">
            <span className="inline-block w-fit max-w-fit">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <Input
                {...register("name", { required: true })}
                label="Full Name : "
                placeholder="Full Name"
              />
              <Input
                {...register("email", {
                  required: true,
                })}
                label="Email : "
                placeholder="Email Address"
                type="email"
              />
              <Input
                {...register("password", { required: true })}
                label="Password : "
                type="password"
                placeholder="Password"
              />
              <Button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-600 rounded-xl"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
        <Outlet />
      </div>
    );
}

export default Signup