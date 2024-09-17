import { NextRequest, NextResponse } from "next/server";
import { IUser } from "./entities/user";

// let admin = false;
// let isAuth = false;
const protectedRoutes = ['/admin']

const accessVerification = (user: IUser, requiredRoles: string[]): boolean => {
    let isOk = false;
    user.roles.map(role => {
        if(requiredRoles.includes(role)) isOk = true
    })
    return isOk
}

const getUser = async (req: NextRequest): Promise<(IUser | null)> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/check`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${req.cookies.get('token_access')?.value}`
            },
            cache: 'no-store',
            credentials: 'include'
        })
        if(!res.ok) return null
        const userData: IUser = await res.json()
        return userData
    }
    catch(e){
        return null
    }
}


const redirect = (req: NextRequest, pathname: string) => {
    const absoluteURL = new URL(pathname, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString())
}

export default function middleware(req: NextRequest){

    // let userData = await getUser(req)
    // if(!userData){
    //     return redirect(req, '/login')
    // }
    // if(protectedRoutes.includes(req.nextUrl.pathname)){
    //     if(!accessVerification(userData, ['moderator', 'admin'])){
    //         return redirect(req, '/')
    //     }
    // }
}

export const config = {
    matcher: ['/admin'],
  }