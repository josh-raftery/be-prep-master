import { getUsers } from 'controller/usersController';
import { NextResponse } from 'next/server';


export async function GET () {
    return getUsers()
    .then((users) => {
        return NextResponse.json(users, {status:200})
    })
}