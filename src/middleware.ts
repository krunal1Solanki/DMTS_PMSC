import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === '/login';

  const token = request.cookies.get('token')?.value || '';
  console.log('PATH', path, typeof token, token.length);

  if (!isPublic && (!token || isTokenExpired(token))) {
    // Redirect to login if the route is not public and token is missing or expired
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

const isTokenExpired = (token : any) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return true; // Consider token expired on decoding error
  }
};

export const config = {
  matcher: ['/scheduler', '/users', '/settings', '/', '/map'],
};
