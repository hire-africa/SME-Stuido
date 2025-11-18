import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes that don't need authentication
  const publicRoutes = ['/', '/login', '/signup', '/pricing']
  const isPublicRoute = publicRoutes.includes(pathname)

  // Protected routes
  const clientRoutes = ['/client-dashboard', '/editor']
  const adminRoutes = ['/admin-dashboard']
  const isClientRoute = clientRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get token from cookie
  const token = request.cookies.get('token')?.value

  // If no token, redirect to login for protected routes
  if (!token) {
    if (isClientRoute || isAdminRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  // For protected routes, allow access if token exists
  // Actual verification happens client-side in Zustand store
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
