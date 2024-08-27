'use client'
import Image from "next/image";
import { UserContext } from "@components/client/userProvider";
import  { useContext, useState } from 'react'
import { postUser } from "api";
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const { user, setUser } = useContext(UserContext);
  const [signUpUsername, setSignUpUsername] = useState({
    username: "",
    name: "",
    avatar_url: "",

  });
  const router = useRouter()
  const [error, setError] = useState(null);

  function handleSignUp(event) {
    const {name,value} = event.target
    setSignUpUsername({
        ...signUpUsername,
        [name]: value
      })
  }

  function handleSubmitSignUp(event) {
    event.preventDefault();
    
  postUser(signUpUsername)
    .then((newUser) => {
      setUser(newUser);
      router.push(`/profile/${newUser.user_id}`);
    })
    .catch((error) => {
      setError("An error occurred during sign up.");
      console.error(error);
    });

  setSignUpUsername({
    username: "",
    name: "",
    avatar_url: "",
  });
  }


  return (
    <>
      <container className="flex flex-col items-center pb-10 m-4">
        <form className="card bg-white max-w-xl shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign Up</h2>
              <label className="input input-bordered flex items-center gap-2 bg-white" id="username">
                <Image
                  src="/userIcon.png"
                  alt="username icon"
                  width={20}
                  height={20}
                />
                <input type="text" className="grow"
                onChange={handleSignUp}
                value={signUpUsername.username}
                placeholder="Username" name="username" />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-white" id="username">
                <Image
                  src="/nameIcon.png"
                  alt="name icon"
                  width={20}
                  height={20}
                />
                <input type="text" className="grow" 
                onChange={handleSignUp}
                value={signUpUsername.name}

                placeholder="First name" name="name" />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-white" id="username">
                <Image
                  src="/avatarURLIcon.png"
                  alt="avatar URL  icon"
                  width={20}
                  height={20}
                />
                <input type="url" className="grow" 
                 onChange={handleSignUp}
                 value={signUpUsername.avatar_url}
                placeholder="Avatar URL" name="avatar_url" />
              </label>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary" onClick={handleSubmitSignUp} value="Sign up" >Sign Up</button>
            </div>
          </div>
        </form>
      </container>
    </>
  );
}
