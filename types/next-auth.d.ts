import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
        accessToken?: string;
        expires?: string;
        refreshToken?: string;
        error?: string;
    }

    interface User extends DefaultUser {
        id: string;
        refreshToken?: string;
        accessTokenExpires?: number;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
    }
}
