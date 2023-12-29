import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react"

interface CountdownContextProps {
	secondsLeft: number
	setSecondsLeft: Dispatch<SetStateAction<number>>
}

const CountdownContext = createContext<CountdownContextProps | null>(null)
export const CountdownProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [secondsLeft, setSecondsLeft] = useState(0)
	useEffect(() => {
		if (secondsLeft <= 0) return
		const timeout = setTimeout(() => {
			setSecondsLeft(secondsLeft - 1)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [secondsLeft])

	return (
		<CountdownContext.Provider value={{ secondsLeft, setSecondsLeft }}>
			{children}
		</CountdownContext.Provider>
	)
}

export default CountdownContext
