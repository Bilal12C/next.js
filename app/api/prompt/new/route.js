import prompt from '@models/prompt'
import { connectDB } from '@utils/database'
// IMPORT prompt
export const POST = async (req) => {
    const {userid,promptname , tag} = await req.json();
    console.log(userid,promptname , tag)
    try {
        await connectDB();
        const newprompt = await prompt.create({
            creater:userid,
            prompt:promptname,
            tag:tag
        })
        console.log(newprompt)
        if(newprompt){
            return true
        }
    } catch (error) {
        console.log(error)
    }
} 