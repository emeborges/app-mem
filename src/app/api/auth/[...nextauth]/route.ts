import axios from "@/lib/axios"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const response = await axios.post('/auth/signin',{
					email: credentials?.email,
					password: credentials?.password
				})
			
				const userTotal = await response.data

				const user = {
					AcessToken: userTotal.AccessToken,
					RefreshToken: userTotal.RefreshToken,
					IdToken: userTotal.IdToken,
					name: userTotal.user_details.name,
					scope: userTotal.scope,
					picture: userTotal.user_details.picture_url,
					id: userTotal.user_details.id,
					email: userTotal.user_details.email,
					school_term: userTotal.user_details.school_term,
					is_authorized: userTotal.user_details.is_authorized
				}				
				
				if (user && response.status) {
	
					return user
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/auth/signin'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }