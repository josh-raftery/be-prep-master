import { getUsersById } from 'controller/usersController';

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    return getUsersById(user_id)
}