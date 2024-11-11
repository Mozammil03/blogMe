import React, {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import service from "../../appwrite/config"
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"



export default function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"

        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
            
            if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredImg)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined 
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImg = fileId
                const dbPost = await service.createPost({...data, userId: userData.$id})

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
    }, [])

    useEffect(() => {
        watch((value, {name}) => {
            // console.log(value)
            if (name === "title" && value.title) {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        }) 
    }, [watch, slugTransform, setValue])
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex-col flex  md:sm:w-[80%] w-[100%] shadow-2xl bg-orange-200 p-4 rounded-xl flex-wrap justify-center items-center place-content-center"
        >
          <div className="">
            <div>
              {post && post.content
                ? post.title + " - " + post.content + " - " + post.featuredImg
                : ""}
            </div>
          </div>
          <div className="flex flex-row gap-3 text-start font-bold w-[100%]">
            <div className="flex flex-row font-bold gap-2 text-start w-[50%]">
              <Input
                label="Title"
                placeholder="Title"
                className="mb-4 font-semibold"
                {...register("title", { required: true })}
              />
            </div>
            <div className="flex flex-row w-1/2">
              <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4 font-semibold"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
          <div className="font-bold text-start w-[100%]">
            <RTE
              label="Content: "
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className=" gap-2 flex flex-row text-start font-bold w-[100%]">
            <Input
              label="Featured Image:"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={service.getFilePreview(post.featuredImg)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status:"
              className="mb-4"
              {...register("status", { required: true })}
            />
          </div>
          <Button
            type="submit"
            bgColor={post ? "bg-orange-200" : "bg-orange-500"}
            className="w-fit rounded-xl shadow-2xl"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    );
}