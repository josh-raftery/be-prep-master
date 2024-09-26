import Next from "@components/client/Next";
import Previous from "@components/Previous";
import Link from "next/link";

export default function Redirect(){
    return (
        <section className="flex flex-col items-center pb-10 m-4">
            <div className="redirect-container card bg-white w-96 shadow-xl">
                <h2 className="card-title  mb-6">To use this feature you have to...</h2>
                <Link href='/signin' className="w-full">
                    <button className="btn btn-block btn-primary mb-6">Sign In<Next/></button>
                </Link>
                <Link href='/signup' className="w-full">
                    <button className="btn btn-block btn-secondary mb-6">Sign Up<img style={{width: "20px"}} src='/userIcon.png' /></button>
                </Link>
                <h2 className="card-title mb-6">Or...</h2>
                <Link href='/' className="w-full">
                    <button className="btn btn-block btn-accent "><Previous/>Back to Home</button>
                </Link>
            </div>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </section>
        
    )
}