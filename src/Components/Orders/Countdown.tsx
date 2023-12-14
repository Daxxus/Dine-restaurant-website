import { useEffect, useState } from "react"
// ta opcja z customowym hookiem tylko do konkretnego komponentu nie Contextu globalnego
const useCountdown = () => {
	const [secondsLeft, setSecondsLeft] = useState(0)

	useEffect(() => {
		if (secondsLeft <= 0) return
		const timeout = setTimeout(() => {
			setSecondsLeft(secondsLeft - 1)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [secondsLeft])	

	const start = (seconds: number) => {
		setSecondsLeft(seconds)
	}

	return { secondsLeft, start }
}

export default useCountdown
