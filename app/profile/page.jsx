"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Profile from "../../components/Profile"
import { Router } from "next/router"
function page() {

  const [posts, setposts] = useState([])
  const{data,status} = useSession();
  let router = useRouter();
  useEffect(() => {
    const fetchPrompt = async () => {
      // console.log("sss",data)
      const response = await fetch(`/api/users/${data._id}/posts`);
      const myposts = await response.json();
      if (myposts) {
        // console.log("Pfofile data", myposts)
        setposts(myposts)
      }
    }
    fetchPrompt();
  }, [])

  const EditFunction = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);  
    
  }

  const HandleDelete = async (post) => {
   const HasConfirmed = confirm("Are you sure you want to Delete");
   if(HasConfirmed){
    try {
       const data = await fetch(`api/prompt/${post._id.toString()}`,{method:'DELETE'})
       if(data.status == 200){
        const filteredpost = posts.filter((item)=>{
          return item._id !== post._id
        })
        setposts(filteredpost)
        router.push('/profile')
       }
    } catch (error) {
     console.log(error) 
    }
   }
  }
  return (
    <Profile
      name="My"
      desc="Welcome To Your Personalize Profile Page"
      data={posts}
      EditFunction={EditFunction}
      HandleDelete={HandleDelete}
    />
  )
}

export default page