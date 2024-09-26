// "use client";
// import { useRouter } from "next/router";
// import { useEffect, useContext } from "react";
// import { UserContext } from "@components/client/userProvider";

// export default function checkUser() {
//   const { user } = useContext(UserContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push('/redirect');
//     }
//   }, []);
// }
