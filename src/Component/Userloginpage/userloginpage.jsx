'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function Userloginpage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (pwd) => {
    const lengthValid = pwd.length >= 8; // Check length between 8 and 10
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);
    return lengthValid && hasLetter && hasNumber && hasSymbol;
  };

  const isPhoneNumber = (input) => /^\d{10}$/.test(input);
  const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailOrPhone.trim() && !password.trim()) {
      toast.error('Please enter your email/phone and password.');
      return;
    }

    if (!emailOrPhone.trim()) {
      toast.error('Please enter your email or phone.');
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter your password.');
      return;
    }

    const isNumeric = /^\d+$/.test(emailOrPhone);
    if (isNumeric) {
      if (!isPhoneNumber(emailOrPhone)) {
        toast.error('Phone number must be exactly 10 digits.');
        return;
      }
    } else {
      if (!isEmail(emailOrPhone)) {
        toast.error('Please enter a valid email address.');
        return;
      }
    }

    if (!validatePassword(password)) {
      toast.error('Password must be between 8 and include at least one letter, number, and special character.');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          identifier: emailOrPhone,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      toast.success('Login successful!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <Toaster position="top-center" />
      <div className="flex w-full h-screen shadow-lg rounded-none overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 h-full bg-[url('/leftbg.jpg')] bg-cover bg-center p-8 flex flex-col justify-center items-center relative">
          <Image src="/logo.png" alt="Task Manager Icon" width={160} height={160} className="mb-4" />
          <h1 className="text-4xl font-bold text-black mb-4">Welcome Back!</h1>
          <Image src="/logimage.png" alt="Illustration" width={400} height={320} className="mb-5" />
          <p className="text-2xl text-black text-center px-4 rounded">
            A simple and intuitive task manager to organize,<br />
            track, and prioritize your tasks.
          </p>
        </div>

        {/* Right Panel */}
        <div
          className="w-1/2 h-full flex flex-col items-center justify-center px-8 relative"
          style={{
            backgroundImage: 'url("/bg1.jpg"), url("/bg2.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {/* Decorative Images */}
          <Image src="/vector.png" alt="vector" height={400} width={96} className="absolute z-0" style={{ top: '80px', right: '100px' }} />
          <Image src="/vector1.png" alt="vector" height={50} width={50} className="absolute z-0" style={{ top: '55px', left: '50px', transform: 'rotate(15deg)' }} />
          <Image src="/vector_right.png" alt="vector" height={45} width={45} className="absolute z-0" style={{ bottom: '200px', left: '75px', transform: 'rotate(350deg)' }} />
          <Image src="/vector2.png" alt="vector" height={45} width={45} className="absolute z-0" style={{ bottom: '45px', right: '128px' }} />
          <Image src="/vector.png" alt="vector" height={85} width={85} className="absolute z-[-1]" style={{ bottom: '64px', left: '51px' }} />
          <Image src="/vector_pencile.png" alt="vector" height={400} width={96} className="absolute z-0 bottom-[60px] left-[200px] rotate-[-10deg]" />
          <Image src="/vector_right.png" alt="vector" height={35} width={35} className="absolute z-10" style={{ bottom: '30px', left: '60px' }} />
          <Image src="/vector_flag.png" alt="vector" height={50} width={50} className="absolute z-0" style={{ bottom: '300px', right: '75px' }} />

          {/* Heading */}
          <h1 className="text-4xl font-bold text-black mb-8 z-10">User Login</h1>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-[0_7px_25px_rgba(0,0,0,0.1)] p-10 w-[550px] h-[400px] max-w-full z-10">
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email / Phone */}
              <div>
                <label className="block text-sm font-medium text-black mb-1 font-poppins">
                  E-mail / Phone
                </label>

                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    const isNumeric = /^\d+$/.test(value); // Check if input is numeric

                    if (isNumeric) {
                      // Restrict phone number to exactly 10 digits
                      if (value.length <= 10) {
                        setEmailOrPhone(value);
                      }
                    } else {
                      // Allow email input without restrictions
                      setEmailOrPhone(value);
                    }
                  }}
                  placeholder="Enter your email or phone"
                  className="w-full px-4 py-2 rounded-xl bg-white text-black shadow-[0_7px_25px_rgba(0,0,0,0.1)] focus:outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-black mb-1 font-poppins">
                  Password
                </label>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 8-10 character secure password"
                  required
                  minLength={8} // Minimum length
                  className="w-full px-4 py-2 rounded-xl bg-white text-black shadow-[0_7px_25px_rgba(0,0,0,0.1)] focus:outline-none pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[34px] right-3 text-gray-600 cursor-pointer text-xl"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                <Link href="/forgotpassword" className="text-xs text-right block mt-4 text-[rgba(62,144,151,1)] hover:underline">
                  Forget Password?
                </Link>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Login Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-63 py-3 bg-[rgba(109,237,248,1)] hover:bg-cyan-500 text-black font-bold rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Sign Up Prompt */}
            <p className="text-sm mt-6 text-center  text-black font-semibold ">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-[rgba(62,144,151,1)] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
