export type payloadType = {
	user: string
	type?: string | null
	role?: string | null
	iat?: number
	exp?: number
	iss?: string
	sub?: string
}

export default payloadType
