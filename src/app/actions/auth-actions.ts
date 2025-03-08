'use server'

import { createClient } from "@/lib/supabase/server";

interface AuthResponse{
    error: null | string,
    success: boolean,
    data: unknown | null;
}
export async function signup(formdata: FormData): Promise<AuthResponse>{
    const supabase=await createClient();
    const data={
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
        options:{
            data:{
                full_name: formdata.get("full_name") as string,
            }
        }
    }
    const { data:signupData, error } = await supabase.auth.signUp(data);
    
    return{
        error: error?.message || 'An error occurred',
        success: !error,
        data: signupData || null
    }
}