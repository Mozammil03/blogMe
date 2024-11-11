import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"

import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from "../components/cont/Container"
import parse from "html-react-parser"
import {useSelector } from "react-redux"

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false
  
  
  // console.log("Navigated to post with slug:", slug);

  useEffect(() => {
    if (slug) {
      // console.log("slug exist")
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          // console.log("not able to get post")

          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImg);
        navigate("/")
      }
    })
  }

  return post ? (
    <div className="py-8 bg-orange-200 m-2 rounded-xl">
      <Container>
        <div className=" w-[100%] h-[300px] flex justify-center  mb-4 relative  rounded-xl shadow-xl">
          <img
            src={appwriteService.getFilePreview(post.featuredImg)}
            alt={post.title}
            className="rounded-xl h-full w-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="w-full mb-6 shadow-xl">
          <h1 className="text-4xl md:sm:text-7xl md:sm:w-[80%] absolute w-[350px] translate-y-[-220px] p-2  font-bold text-center ">
            <div className="flex flex-col justify-center  text-orange-400 items-center place-content-center">
              {post.title}
            </div>
          </h1>
          <div className="browser-css bg-orange-50 shadow-xl text-2xl p-8 rounded-xl w-[100%] text-left ">
            {parse(post.content)}
          </div>
        </div>
        {isAuthor && (
          <div className="">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-orange-300 "
                className="mr-3 rounded-xl hidden font-semibold hover:bg-orange-400 "//edit hidden ??
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-orange-600 "
              className="rounded-xl hover:bg-red-500 "
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}

export default Post