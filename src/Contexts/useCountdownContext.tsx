import CountdownContext from "./CountdownContext"
import { useContext } from "react"

const useCountdownContext = () => {
	const ctx = useContext(CountdownContext)

	if (!ctx) {
		throw new Error(
			"Missing CountdownContext, it is not wrapped in CountdownContextProvider    "
		)
	}
	return ctx
}

export default useCountdownContext
