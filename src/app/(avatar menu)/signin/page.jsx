
"use client";
import { useContext, useState } from "react";
import { UserContext } from "@components/client/userProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserByUsername } from "api";

export default function SignIn() {
  const { setUser, signIn } = useContext(UserContext);
  const [username, setUsername] = useState(""); // Initialize as a string
  const router = useRouter();

  function handleSignIn(event) {
    setUsername(event.target.value); // Update username as a string
  }

  async function handleSubmitSignIn(event) {
    event.preventDefault();
    const host = process.env.HOST || "localhost";
      const port = process.env.PORT || 3000;
    try {
      
      const userData = await fetch(
    `http://${host}:${port}/api/users/?username=${username}`)
    const responseData = await userData.json();
    const userObj = responseData.user;
      if (userObj) {
        signIn(userObj);  // Update context with fetched user data
        router.push(`/profile/${userObj.user_id}`);  // Redirect to profile
      } else {
        console.error("User not found or error occurred");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center pb-10 m-4">
        <form className="card bg-white shadow-xl" >
          <div className="card-body">
            <h2 className="card-title">Sign In</h2>
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
                value={username} // Use the string value directly
                name="username" // Provide a name for the input
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
