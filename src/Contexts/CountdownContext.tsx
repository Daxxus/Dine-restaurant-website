import { Dispatch, SetStateAction, createContext, useState } from "react"

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
	return (
		<CountdownContext.Provider value={{ secondsLeft, setSecondsLeft }}>
			{children}
		</CountdownContext.Provider>
	)
}

export default CountdownContext
