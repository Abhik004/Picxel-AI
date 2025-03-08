'use client'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import { Button } from '../ui/button';
import SignupForm from './SignupForm';
import Link from 'next/link';
import ResetPassword from './ResetPassword';

const AuthForm = () => {
    const [mode, setMode] = useState('login');

    return (
        <div className='space-y-6'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {mode === "reset" ? "Reset Password" : mode === "login" ? "Login" : "Sign Up"}
                </h1>
                <p className='text-sm text-muted-foreground'>
                    {mode === "reset"
                        ? "Enter your mail below to reset your password"
                        : mode === "login"
                            ? "Enter your email below to login your account"
                            : "Enter your information below to create an account"}
                </p>
            </div>

            {mode === "login" && (
                <>
                    <LoginForm className='' />
                    <div className='text-center flex flex-col space-y-2'>
                        <Button variant={"link"} className='p-0' onClick={() => setMode('signup')}>
                            Need an account? Signup
                        </Button>
                        <Button variant={"link"} className='p-0' onClick={() => setMode('reset')}>
                            Forgot Password? Reset
                        </Button>
                    </div>
                </>
            )}

            {mode === "signup" && (
                <>
                    <SignupForm className='' />
                    <div className='text-center flex flex-col space-y-2'>
                        <Button variant={"link"} className='p-0' onClick={() => setMode('login')}>
                            Already have an account? Login
                        </Button>
                    </div>
                    <p className="text-center text-sm">
                        By clicking signup, you agree to our <Link href="#" className='underline underline-offset-4 hover:text-primary'>Terms & Conditions</Link> and <Link href="#" className='underline underline-offset-4 hover:text-primary'>Privacy Policy</Link>
                    </p>
                </>
            )}

            {mode === "reset" &&  (
              <>
              <ResetPassword />
              <div className="text-center">
        <Button variant={"link"} className='p-0' onClick={() => setMode('login')}>
          Back to Login
        </Button>
      </div>
              </>
            )}
        </div>
    )
}

export default AuthForm;
