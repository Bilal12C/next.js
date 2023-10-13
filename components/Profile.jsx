import React from 'react'
import PromptCard from './PromptCard'
function Profile({
  name,
  desc,
  EditFunction,
  data,
  HandleDelete
}) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{name} Profile</span></h1>
      <p className='desc text-left'>{desc}</p>
      <div className="mt-10 prompt_layout">
          {
            data?.map((post)=>(
                <PromptCard
                 key={post._id}
                 post={post}
                 EditFunction={()=>EditFunction && EditFunction(post)}
                 HandleDelete={()=>HandleDelete && HandleDelete(post)}
                 />
            ))
          }
        </div>
    </section>
  )
}

export default Profile