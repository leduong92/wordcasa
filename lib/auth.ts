import { LoginResponse } from '@/modals';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// hoặc GoogleProvider, GithubProvider, v.v.

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                anonymousId: { label: 'AnonymousId', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                // TODO: gọi API backend để check user
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/account/authenticate`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: credentials.email,
                            password: credentials.password,
                            anonymousId: credentials.anonymousId,
                        }),
                    }
                );

                const user = await res.json();
                if (res.ok && user.data) {
                    const response = {
                        id: user.data.userDto.id,
                        name: user.data.userDto.userName,
                        email: user.data.userDto.email,
                        accessToken: user.data.accessToken,
                        refreshToken: user.data.refreshToken,
                        accessTokenExpires: new Date(user.data.expiresAt).getTime(),
                    };
                    return response;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = (user as any).accessToken;
                token.refreshToken = user?.refreshToken;
                token.accessTokenExpires = user?.accessTokenExpires;
            }

            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (token.error === 'RefreshAccessTokenError') {
                return {
                    user: undefined,
                    accessToken: undefined,
                    refreshToken: undefined,
                    error: 'RefreshAccessTokenError',
                    expires: new Date(0).toISOString(),
                };
            }
            session.user.id = token.id as string;
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.error = token.error;

            if (token.accessTokenExpires) {
                session.expires = new Date(token.accessTokenExpires).toISOString();
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: token.refreshToken,
            }),
        });
        const refreshed = await res.json();

        if (!refreshed.isSuccess) {
            throw refreshed;
        }

        return {
            ...token,
            accessToken: refreshed.data.accessToken,
            accessTokenExpires: new Date(refreshed.data.expiresAt).getTime(),
            refreshToken: refreshed.data.refreshToken ?? token.refreshToken,
        };
    } catch (error) {
        // console.error('Refresh token error', error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}
