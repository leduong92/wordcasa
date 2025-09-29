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
                        accessToken: user.data.token,
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
                token.accessToken = (user as any).accessToken;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user.id = token.id as string;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
