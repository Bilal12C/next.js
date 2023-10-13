"use client"
import { useEffect, useState } from "react"
import Form from "@components/Form"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import React from "react"

function page() {

  const [submitting, setSubmitting] = useState(false)
  let router = useRouter();
  const searchparams = useSearchParams();
  const promptid = searchparams.get('id')
  const [post, setposts] = useState({
    promptname: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptid}`);
      console.log("res", response)
      const data = await response.json();

      setposts({
        promptname: data.prompt,
        tag: data.tag,
      });
    };

    if (promptid) getPromptDetails();
  }, [promptid]);

  const EditPromptData = async (e) => {
    e.preventDefault();
    // console.log(post)
    setSubmitting(true)
    // console.log(session)
    // console.log(post)
    try {
      const response = await fetch(`/api/prompt/${promptid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          promptname: post.promptname,
          tag: post.tag
        })
      })
      if (response) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setposts={setposts}
      submitting={submitting}
      handlesubmitting={EditPromptData}
    />
  )
}

export default page