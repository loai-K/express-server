import { User } from '../types'

export interface AuthInterface {
	user: User
	accessToken: string
}

export default AuthInterface
