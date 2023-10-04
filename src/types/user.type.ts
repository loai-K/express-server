export type User = {
	// id?: number
	id?: string
	user_name: string
	first_name: string
	last_name?: string
	bio?: string
	email: string
	mobile?: string
	password: string
	status: boolean
	last_login?: string
	registered_at?: string
}

export default User
