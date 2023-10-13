import prompt from '@models/prompt'
import { connectDB } from '@utils/database'


export const GET = async (reques, { params }) => {
    try {
        console.log("asdansdl",params.id)
        await connectDB()
        const promptdata = await prompt.findById(params.id).populate("creater")
        console.log(JSON.stringify(promptdata))
        if(promptdata)
        {
            console.log("HII")
            return new Response(JSON.stringify(promptdata),{status:200})
        }

    } catch (error) {
        console.log("error",error)
        return new Response("Internal Server Error", { status: 500 });
    }
}


export const PATCH = async (request,{params}) => {
  try {

    await connectDB();
    const {promptname,tag} = await request.json();
    console.log("adasd",promptname,tag)
    console.log("tag",tag)
    const existingPrompt = await prompt.findById(params.id)
    if(!existingPrompt){
        return new Response('Prompt Doesnot Exists',{status:404})
    }
    console.log("exois",existingPrompt)
    existingPrompt.prompt = promptname;
    existingPrompt.tag = tag;
    
    await existingPrompt.save();
   
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
}


export const DELETE = async (request, { params }) => {
    try {
        console.log("asss",params.id)
        await connectDB();
        await prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};