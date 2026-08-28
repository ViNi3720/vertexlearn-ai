import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";



export async function POST(request){
    try{
        //frontend se email aur password lo
        const{email,password} = await request.json();

        // feild check kro
        if(!email || !password){
            return NextResponse.json(
                {message:"All fields are required"},
                {status:400}
            );
        }
        // user ko dundho database mai
        const userExist = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // user nhi mila 
        if(userExist.rows.length === 0){
            return NextResponse.json(
                {message:"Invalid email or password"},
                {status:401}
            );
        }

        //user mil gya to password compare kro 
        const user = userExist.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        //not match
        if(!isMatch){
            return NextResponse.json(
                {message:"Invalid email or password"},
                {status:401}
            );
        }
         
        //token bnao 
        const token = jwt.sign(
            {id:user.id, name:user.name, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        // sub kuch shi ho mtlb success to bs succese ka masg token ke vjh se return nhi cokies mai 
        // token set phir return responce
        // responce bn gya
        const responce =  NextResponse.json(
            {message:"Login Successfull",user:{id:user.id, name:user.name, email:user.email, role:user.role}},
            {status:200}
        );

        //tokent set kro
        responce.cookies.set("token",token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 60*60*24*7
        });

        // ab responce ko return kr do
        return responce;
    }catch(err){
        console.log(err);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status:500}
        );
    }
}