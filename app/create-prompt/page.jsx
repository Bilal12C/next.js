"use client"
import { useState } from "react"
import Form from "../../components/Form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
function page() {
 
  const{data:session} = useSession();
  const [submitting,setSubmitting] = useState(false)
  let router = useRouter();
  const[post,setposts] = useState({
    promptname:'',
    tag:''
  })

  const createprompt = async (e) => {
  e.preventDefault();
  console.log(post)
  setSubmitting(true)
  console.log(session)
  console.log(post)
  try {
   const response = await fetch('/api/prompt/new',{
    method:'POST',
    body:JSON.stringify({
      userid:session?._id,
      promptname:post.promptname,
      tag:post.tag
    })
   }) 
   if(response){
     router.push('/')
   }
  } catch (error) {
    console.log(error)
  }
  finally{
    setSubmitting(false)
  }
  }

  
  return (
    <Form
    type = 'Create'
    post={post}
    setposts={setposts}
    submitting={submitting}
    handlesubmitting={createprompt}
    />
  )
}

export default page