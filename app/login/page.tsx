"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        const {data,error}=await supabase.auth.signInWithPassword({
            email,password,
        });

        if(error){
            console.log("login error, ",error.message);
            alert("error in login check console");
            return;
        }
        if(data.user){
            const {data:profile}=await supabase.from("profiles")
            .select("role").eq("id",data.user.id).single();
            if(profile?.role==="student"){
                router.push("/dashboard/student");
            }
            else{
                router.push("/dashboard/recruiter");
            }
        }

    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input 
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} />

                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />

                <button>Login</button>

            </form>
        </div>
    );
}