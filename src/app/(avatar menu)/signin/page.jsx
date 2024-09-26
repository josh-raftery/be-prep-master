
"use client";
import { useContext, useState } from "react";
import { UserContext } from "@components/client/userProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserByUsername } from "api";

export default function SignIn() {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSignIn(event) {
    setUsername(event.target.value); 
  }

  function handleSubmitSignIn(event) {
    event.preventDefault();
    if (!username || username.trim() === "") {
      setError(true);
    } else {
      getUserByUsername(username)
        .then((user) => {
          signIn(user);
          router.push(`/profile/${user.user_id}`);
        })
        .catch((error) => {
          console.error("Error during sign-in:", error);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col items-center pb-10 m-4">
        <form className="card bg-white shadow-xl" >
          <div className="card-body">
            <h2 className="card-title">Sign In</h2>
            {error && (
            <p className="text-red-500 text-sm text-center">
              Username cannot be empty.
            </p>
          )}
            <label className="input input-bordered flex items-center gap-2 bg-white">
              <Image
                src="/userIcon.png"
                alt="username icon"
                width={20}
                height={20}
              />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                onChange={handleSignIn}
                value={username} 
                name="username" 
                required
              />
            </label>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary" onClick={handleSubmitSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
