"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function SignupPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })


        if (error) {
            console.log("signup error, ", error.message);
            alert("error in signup check console");
            return;
        }
        if (data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                role,
            });

            router.push("/login");
        }
    }
    return (
        <div>
            <form onSubmit={handleSignup}>
                <h1>SignUp</h1>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Student</option>
                    <option value="recruiter">Recruiter</option>
                </select>

                <button>Sign Up</button>
            </form>
        </div>
    );
}

