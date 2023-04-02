import React from 'react'
import {AppContext} from '../context/AppContext';
import Spinner from './Spinner';
import {useContext} from "react";



const Blogs = () => {

    // 3. Consume using useContext 
    const {posts, loading} = useContext(AppContext);
    console.log("Printing inside blogs component");
    console.log(posts);
  return (
    <div className =" w-11/12 max-w-[670px] h-screen py-8 flex flex-col gap-y-7 mt-[66px] mb-[70px]  ">
      {
        loading ? 
        (<Spinner/>) : 
        (
            posts.length === 0 ? 
        (<div>
            <p>No Post Found</p>
        </div>) :
        (posts.map( (post) => (
            <div key={post.id}>
                <p className="font-bold text-lg ">{post.title}</p>

                <p className="text-sm mt-[4px]">
                  By <span className="italic">{post.author}</span> on <span className="underline font-bold">{post.category}</span>
                </p>
                
                <p className="text-sm mt-[4px]">Posted on {post.date}</p>

                <p className="text-md mt-[14px]">{post.content}</p>

                <div className="flex gap-x-3">
                    {post.tags.map( (tag, index) => {
                        return <span key={index} className="text-blue-500 mt-[5px] underline font-bold text-xs">{`#${tag}  `}</span>
                    })}
                </div>

            </div>
        )))
        )
      }
    </div>
  )
}

export default Blogs
