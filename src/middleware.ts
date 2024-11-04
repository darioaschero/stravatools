import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isLoggedIn = !!token;
      const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
  },
});

export const config = { matcher: ['/dashboard/:path*'] }; 