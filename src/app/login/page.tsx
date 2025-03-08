import React from 'react';
import AuthImg from '@/public/Abstract Curves and Colors.jpeg';
import Image from 'next/image';
import Logo from '@/components/Logo';
import AuthForm from '@/components/authentication/AuthForm';

const AuthenticationPage = () => {
  return (
    <main className="h-screen grid grid-cols-2 relative">
      <div className="relative w-full flex flex-col bg-muted p-10 text-primary-foreground">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image src={AuthImg} alt="login Image" fill className="w-full h-full object-cover" />
        <div className="relative z-20 flex items-center">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 text-white">
            <p className="text-lg">
              &ldquo;Picxel AI is a game changer for me. I have been able to generate high-quality professional headshots within minutes. It has saved me countless hours of work and cost as well.&rdquo;
            </p>
            <footer className="text-sm">Anil S.</footer>
          </blockquote>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
        <div className='max-w-xl w-[320px] mx-auto'>
        <AuthForm />
        </div>
      </div>
    </main>
  );
};

export default AuthenticationPage;
