import { addToMyRecipesInController } from "controller/usersController";
import { fetchUserById, updateUser } from "models/usersModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const splitUrl = request.url.split("/");
  const user_id = splitUrl[splitUrl.length - 1];
  const user = await fetchUserById(user_id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user }, { status: 200 });
}

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const splitUrl = url.pathname.split("/");
    const user_id = splitUrl[splitUrl.length - 1];
    const updateData = await request.json();
    const myrecipes = request.nextUrl.searchParams.get("myrecipes");

    let response;

    if (myrecipes === "true") {
      response = await addToMyRecipesInController(user_id, updateData);
    } else {
      response = await updateUser(user_id, updateData);
    }
    return NextResponse.json(
      { message: "Success", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}
