import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";


export async function POST(request){
    try{
        //Api se data lana
        const{name,email,password,role} = await request.json();
        // check krte hai feild empty to nhi hai n
        if(!name || !email || !password || !role){
            return NextResponse.json(
                {message: "All feilds are required"},
                {status: 400}
            );
        }
        // Yahan baad me database check hoga
        const existingUser = await pool.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
        );
        // Check if user already exists
        if(existingUser.rows.length >0){
            return NextResponse.json(
                {message:"User already exists"},
                {status:409}
            );
        }

       // Yahan password hash hoga
       const hashedPassword = await bcrypt.hash(password,10);

       // Yahan new user database me save hoga
       const result = await pool.query(
        "INSERT INTO users(name,email,password_hash,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role",
        [name,email,hashedPassword,role]
       );

       return NextResponse.json(
        {message:"User crated successfully"},
        {status:201}
       );
    }
    catch(err){
        console.log(err);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 500}
        );
    }
}