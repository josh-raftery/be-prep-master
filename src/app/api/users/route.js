import { getUsers, postUser } from 'controller/usersController';
import { NextResponse } from 'next/server';


export async function GET() {
    return getUsers()
    .then((users) => {
        return NextResponse.json(users, {status:200})
    })
}

export async function POST(req){
    const body = await req.json();
    return postUser(body)
}