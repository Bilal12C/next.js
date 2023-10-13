
import Prompt from '@models/prompt'
import { connectDB } from '@utils/database'
import { NextResponse } from 'next/server';
export const GET = async () => {
  try {
   await connectDB();
    const promptdata = await Prompt.find({}).populate('creater')
    return new NextResponse(JSON.stringify(promptdata),{status:200})
  } catch (error) {
    return new Response('Failed to Fetch Prompt',{status:500})
  }
}