import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    
    const isPublic = path == '/login';
    
    const token = request.cookies.get("token")?.value  || '';
    console.log("PATH", path, typeof token, token.length)

    if(!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    } 
}
 
export const config = {
  matcher: ['/scheduler', '/users', '/settings', '/', '/map'],
}