import { getUsersById } from 'controller/usersController';
import { NextResponse } from 'next/server';

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    return getUsersById(user_id)
    .then((users) => {
        return NextResponse.json(users, {status:200})
    })
}