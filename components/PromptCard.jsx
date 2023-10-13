'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Copyurl from '../public/assets/icons/copy.svg'
import tick from '../public/assets/icons/tick.svg'
function PromptCard({ post, handletagclick , EditFunction,HandleDelete}) {

    const { data } = useSession();
    let router = useRouter();
    const pathName = usePathname();


    const [copied, setCopied] = useState('')
    const handleProfileClick = () => {
        console.log(post);
        
        console.log(data)
        if (post?.creator?._id === data._id) return router.push("/profile");
    
        router.push(`/profile/${post?.creater?._id}?name=${post?.creater?.username}`);
      };
    
    const handlecopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setCopied('')
        }, 3000);
    }

    return (
        <div className="prompt_card">
            <div onClick={handleProfileClick} style={{ display: 'flex', justifyContent: 'space-between', cursor:'pointer' }} >
                <div className="flex">
                    <Image
                        src={post?.creater?.image}
                        className="rounded-full object-contain"
                        alt="Prompt-Card"
                        width={50}
                        height={50}
                    />

                    <div className="flex flex-col mx-5">
                        <h3 className="text-gray-900">{post?.creater?.username}</h3>
                        <p className="text-sm text-gray-500">{post?.creater?.email}</p>
                    </div>
                </div>


                <div className="copy_btn" onClick={handlecopy}>
                    <Image
                        alt="copy Button"
                        src={copied === post.prompt ? tick : Copyurl}
                        width={12}
                        height={12}
                    />
                </div>

            </div>
            <p className="my-4 font-satoshi text-sm text-gray-900">{post.prompt}</p>
            <p className="font-sm blue_gradient text-sm cursor-pointer" onClick={()=>handletagclick(post.tag)}>#{post.tag}</p>
            {data?._id === post?.creater?._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={EditFunction}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter text-sm orange_gradient cursor-pointer'
                        onClick={HandleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default PromptCard