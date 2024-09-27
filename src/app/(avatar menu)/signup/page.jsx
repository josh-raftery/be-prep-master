"use client";
import Image from "next/image";
import { UserContext } from "@components/client/userProvider";
import { useContext, useState } from "react";
import { postMealPlan, postUser } from "api";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmitSignUp(event) {
    let newUser = ''
    event.preventDefault();
    return postUser(formData)
      .then((response) => {
        newUser = response
        console.log('here')
        if(typeof window !== 'undefined') window.localStorage.setItem('user',JSON.stringify(newUser))
        setUser(newUser);
        return postMealPlan(newUser.user_id,{meals:[]})
      })
      .then(() => {
        console.log('here1')
        router.push(`/profile/${newUser.user_id}`);
        
      })
      .catch((error) => {
        setError("An error occurred during sign up.");
        console.error(error);
      });

    setFormData({
      username: "",
      name: "",
      avatar_url: "",
    });
  }

  return (
    <>
      <div className="flex flex-col items-center pb-10 m-4">
        <form className="card bg-white max-w-xl shadow-xl"
        onSubmit={handleSubmitSignUp}>
          <div className="card-body">
            <h2 className="card-title">Sign Up</h2>
            <label
              className="input input-bordered flex items-center gap-2 bg-white"
              id="username"
            >
              <Image
                src="/userIcon.png"
                alt="username icon"
                width={20}
                height={20}
              />
              <input
                type="text"
                className="grow"
                onChange={handleChange}
                value={formData.username}
                placeholder="Username"
                name="username"
                required
              />
            </label>
            <label
              className="input input-bordered flex items-center gap-2 bg-white"
              id="username"
            >
              <Image
                src="/nameIcon.png"
                alt="name icon"
                width={20}
                height={20}
              />
              <input
                type="text"
                className="grow"
                onChange={handleChange}
                value={formData.name}
                placeholder="First name"
                name="name"
                required
              />
            </label>
            <label
              className="input input-bordered flex items-center gap-2 bg-white"
              id="username"
            >
              <Image
                src="/avatarURLIcon.png"
                alt="avatar URL  icon"
                width={20}
                height={20}
              />
              <input
                type="url"
                className="grow"
                onChange={handleChange}
                value={formData.avatar_url}
                placeholder="Avatar URL"
                name="avatar_url"
                required
              />
            </label>
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
