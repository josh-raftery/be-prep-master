'useclient'
import Link from "next/link";
import Image from "next/image";


export default function SignUp() {
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
                <input type="text" className="grow" placeholder="Username" id="username" />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-white" id="username">
                <Image
                  src="/nameIcon.png"
                  alt="name icon"
                  width={20}
                  height={20}
                />
                <input type="text" className="grow" placeholder="First name" id="name" />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-white" id="username">
                <Image
                  src="/avatarURLIcon.png"
                  alt="avatar URL  icon"
                  width={20}
                  height={20}
                />
                <input type="url" className="grow" placeholder="Avatar URL" id="name" />
              </label>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </form>
      </container>
    </>
  );
}
