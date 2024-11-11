import React from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/config.js"
import Logo from '../assets/react.svg'

function PostCard({
    $id, title, featuredImg
}) {
  return (
    <Link to={$id ? `/post/${$id}` : "/"}>
      <div className="w-auto bg-orange-200 border-2 text-orange-950 duration-500 hover:bg-orange-300 transition-all border-orange-100 shadow-2xl hover:shadow-gray-400 hover:shadow-md rounded-2xl p-4 flex justify-center items-center flex-col group border-b-2 border-b-orange-500 ">
        <div className="w-[250px] h-[200px] flex justify-center items-center mb-4 rounded-xl shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-200">
          <img
            src={
              appwriteService.getFilePreview(featuredImg)
                ? appwriteService.getFilePreview(featuredImg)
                : Logo
            }
            alt={title}
            className="w-full h-full object-cover border-[2px] rounded-2xl shadow-2xl transition-transform duration-500"
          />
        </div>
        <h2 className="text-xl font-bold bg-orange-100 shadow-xl group-hover:scale-105 duration-200 rounded-xl w-fit text-center pl-2 pr-2 pt-1 pb-1 ">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard