import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
	const allPromises = Promise.all([
		fetch('https://jsonplaceholder.typicode.com/todos'),
		fetch('https://jsonplaceholder.typicode.com/posts'),
	])

	allPromises
		.then((responses) => Promise.all(responses.map((res) => res.json())))
		.then((data) => {
			res.json(data)
		})
		.catch(console.error)
})

export default router
