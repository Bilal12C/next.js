'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const CardPromptList = ({ data, handletagclick }) => {
    return (
        <div className="mt-10 prompt_layout">
          {
            data.map((post)=>(
                <PromptCard
                 key={post._id}
                 post={post}
                 handletagclick={handletagclick}
                />
            ))
          }
        </div>
    )
}
function Feed() {

    const [searchtext, setSearchText] = useState('')
    const [posts, setposts] = useState([])
    const[FilteredData, SetFilteredData] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null);
    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch('api/prompt');
            const data = await response.json();
            if (data) {
                SetFilteredData(data)
                setposts(data)
            }
        }
        fetchPrompt();
    },[])



      const handletagclick = (tagname) => {
         console.log(tagname)
         setSearchText(tagname)
         const data = FilteredData.filter((item)=>{
            return item.tag === tagname
         })
         SetFilteredData(data)
      }
    
      const handleSearchChange = (e) => {
        setSearchText(e.target.value)
      };
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="search for a tag or a username"
                    className="search_input peer"
                    value={searchtext}
                    onChange={handleSearchChange}
                />
            </form>
            <CardPromptList
                data={FilteredData}
                handletagclick={handletagclick}
            />
        </section>
    )
}

export default Feed