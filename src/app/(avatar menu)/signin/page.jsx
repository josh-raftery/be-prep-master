'use client';
// import { useState } from 'react';
// import { useUser } from '../../components/client/userProvider'
// import { useRouter } from 'next/navigation'
import Image from "next/image";


export default function SignIn() {
  //we tried to implement userContext but it creates lots of error! due to client and server components clashing
  // const [username, setUsername] = useState('');
  // const { signIn } = useUser();
  // const router = useRouter();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   signIn(username);
  //   router.push('/profile'); // Redirect to profile page after sign-in
  // };

  return (
    <>
    <container className="flex flex-col items-center pb-10 m-4 ">
      <form className="card bg-white  shadow-xl ">
        <div className="card-body ">
          <h2 className="card-title">Sign In</h2>
          <label className="input input-bordered flex items-center gap-2 bg-white">
            <Image 
            src="/userIcon.png"
            alt="username icon"
            width={20}
            height={20}
            />
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </form>
    </container>  
    </>
  );
}
