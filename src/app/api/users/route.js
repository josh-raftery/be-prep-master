import { postUser, signInUser } from "controller/usersController";
import { NextResponse } from "next/server";

// Uncomment if there is a need to use this function
// export async function GET() {
//   return getUsers().then((users) => {
//     return NextResponse.json(users, { status: 200 });
//   });
// }

export async function POST(req) {
  const body = await req.json();
  return postUser(body);
}

export async function GET(request) {
  const username = request.nextUrl.searchParams.get("username");
  const user = await signInUser(username);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: user }, { status: 200 });
}
