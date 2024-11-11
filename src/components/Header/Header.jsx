import React from 'react'
import Container from "../cont/Container"
import Logo from "../Logo"
import {Link, useLocation} from "react-router-dom"
import LogoutBtn from './LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const location = useLocation();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]

  return (
    <header className="py-3 bg-orange-200 text-orange-950 m-2 border-b-2 border-b-orange-500 shadow-2xl transition-all border-2 border-orange-100 rounded-xl font-bold ">
      <Container>
        <nav className=" flex gap-4 flex-col justify-between md:sm:flex-row ">
          <div className="mr-4 md:sm:text-3xl text-5xl flex justify-center items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex flex-row flex-wrap justify-center items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 mr-6 duration-300 bg-orange-100 shadow-xl hover:shadow-gray-400 hover:shadow-md hover:bg-orange-500 hover:text-orange-100 rounded-xl mb-2 md:sm:mb-0 md:sm:rounded-2xl w-2/2 ${
                      location.pathname === item.slug
                        ? "bg-orange-500 text-orange-100"
                        : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header