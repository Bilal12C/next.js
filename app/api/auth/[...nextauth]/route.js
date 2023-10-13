import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from "../../../../utils/database";
import User from "../../../../models/user";
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.Google_Client_id,
            clientSecret:process.env.Google_Client_Secret
        })
    ],
    callbacks:{
        async session({session}){
            const sessionuser = await User.findOne({
               email:session.user.email
            })
            session.user.id = sessionuser._id.toString();
            return sessionuser;
           },
           async signIn({profile}){
             try {
               await connectDB();
       
               const userexists = await User.findOne({
                   email:profile.email
               })
               console.log(userexists)
               if(!userexists){
                   await User.create({
                       email:profile.email,
                       username:profile.name.replace(" ","").toLowerCase(),
                       image:profile.picture
                   })
               }
               return true
             } catch (error) {
               console.log("......",error)
               return false
             }
           },
    }
  
})


export {handler as GET , handler as POST}