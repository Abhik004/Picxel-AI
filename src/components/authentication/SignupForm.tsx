"use client";
import React, { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";

const passwordValidator = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
);

const formSchema = z.object({
  full_name: z.string().min(3, {
    message: "Full name should be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should be at least 8 characters long",
    })
    .regex(passwordValidator, {
      message:
        "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required",
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

const SignupForm = ({ className }: { className?: string }) => {
  const toastId=useId();
  const [loading,setLoading]=useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Signing up....",{id:toastId});
    setLoading(true);
    const formData=new FormData()
    formData.append("full_name",values.full_name);
    formData.append("email",values.email);
    formData.append("password",values.password);

    const {success,error}=await signup(formData);
    if(!success){
      toast.error(String(error),{id:toastId});
      setLoading(false);
    } else{
      toast.success("Signup successfully.. Confirm your email address",{id:toastId});
      setLoading(false);
      redirect('/login')
    }
    console.log(values);
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
