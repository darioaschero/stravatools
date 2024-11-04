import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    error?: string;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
} 