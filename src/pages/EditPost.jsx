import React from 'react'
import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import service from "../appwrite/config"
import { useEffect } from 'react'
import Container from "../components/cont/Container"
import PostForm from "../components/post-form/PostForm"

function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
         
        }else {
          // console.log("error with getting post")
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost