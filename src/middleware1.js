// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(request) {
//   const token = request.cookies.get('token')?.value;
//   const path = request.nextUrl.pathname;
//    console.log("middleware called")
//    console.log("token:",token);
//   // Function to decode JWT token and check expiration
// //   const isTokenValid = (token) => {
// //     try {
// //       const decoded = jwt.decode(token, { complete: true });
// //       if (!decoded) return false;

// //       // Check if the token has expired
// //       const exp = decoded.payload.exp;
// //       if (!exp) return false;

// //       return Date.now() < exp * 1000; // exp is in seconds, Date.now() is in milliseconds
// //     } catch (error) {
// //       return false;
// //     }
// //   };

// //   // If trying to access login page while already logged in
// //   if (path === '/login' && token && isTokenValid(token)) {
// //     return NextResponse.redirect(new URL('/reviews', request.url));
// //   }

// //   // For protected routes
// //   if (path !== '/login') {
// //     if (!token || !isTokenValid(token)) {
// //       return NextResponse.redirect(new URL('/login', request.url));
// //     }
// //   }

//   return NextResponse.next();
// }

// // Specify which routes this middleware should run for
// export const config = {
//   matcher: ['/reviews/:path*', '/login']
// };