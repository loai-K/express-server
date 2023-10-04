import { lifecycle } from '../bootstrap'

describe('lifecycle', () => {
	it('when lifecycle open check -> then should return true', async () => {
		expect(lifecycle.isOpen()).toEqual(true)
	})

	it('when delay 5s -> then use run step function to ensure timely close', async () => {
		let steps = 0
		const incrementStep = async () =>
			new Promise<void>((resolve) => {
				steps += 1
				return resolve()
			})
		await lifecycle.delay(5000, incrementStep)
		expect(steps).toEqual(25)
	})

	it('when lifecycle close -> then should fire listeners', async () => {
		let closed = false
		lifecycle.on('close', async () => {
			closed = true
		})
		await lifecycle.close()
		expect(closed).toEqual(true)
	})

	it('when lifecycle open check -> then should return false', async () => {
		expect(lifecycle.isOpen()).toEqual(false)
	})
})
