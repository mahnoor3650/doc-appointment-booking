import React, { useState } from 'react'

const Login = () => {
  const [state, setstate]=useState('Sign Up');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [name,setName]= useState('');
  const onsubmithandler =async (event)=>{
    event.preventDefault()
  }
  return (
    <form className="min-h-[80vh] flex items-center">
      <div
        className="flex flex-col gap-3 items-start m-auto p-8 min-w-[340px]
      sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg "
      >
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "Login"} to book appointment
        </p>
        {state === "Sign Up" &&
        <div className="w-full">
          <p>Full Name</p>
          <input
            type="text"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setstate("Login")}
              className="text-primary underline cursor-pointer"
            >
              {" "}
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setstate("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login
