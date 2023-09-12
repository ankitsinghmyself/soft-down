import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Function to check if the user is an admin (replace with your own admin check logic)
function isAdminUser(token: string): boolean {
  // Replace with your logic to check if the user is an admin
  // For example, you might have a user object with roles that you can check
  // return user.roles.includes('admin');
  return true; // Placeholder value for the example
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (!isPublicPath && token && isAdminUser(token)) {
    // If the user is an admin, allow access
    return null;
  }

  if (!isPublicPath && token && !isAdminUser(token)) {
    // If the user is not an admin, redirect to a different route
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
    '/verifyEmail',
    // Add more paths that require admin access here
    '/admin',
    '/admin/dashboard',
    '/admin/softwares',
    '/admin/categories',
  ],
};
