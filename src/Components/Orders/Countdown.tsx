import { useEffect, useState } from "react"

const useCountdown = () => {
	const [secondsLeft, setSecondsLeft] = useState(0)

	useEffect(() => {
		if (secondsLeft <= 0) return
		const timeout = setTimeout(() => {
			setSecondsLeft(secondsLeft - 1)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [secondsLeft])

	// }
	// const secs = 1000
	// const mins = secs * 60
	// const hour = mins * 60
	// const day = hour * 24
	// }

	const start = (seconds: number) => {
		setSecondsLeft(seconds)
	}

	return { secondsLeft, start }
}

export default useCountdown
