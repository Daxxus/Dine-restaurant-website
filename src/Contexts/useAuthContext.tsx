import AuthenticateContext from "./AuthContext"
import { useContext } from "react"


export const useAuthContext = () => {
	const ctx = useContext(AuthenticateContext)
	if (!ctx) {
		throw new Error("Missing AuthContext, it's not wrapped in AuthenticateProvider")
	}
	return ctx
}