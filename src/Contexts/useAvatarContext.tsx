import AvatarContext from "./Avatar.Context"
import { useContext } from "react"

const useAvatarContext = () => {
	const ctx = useContext(AvatarContext)

	if (!ctx) {
		throw new Error("Missing AuthContext, it's not wrapped in AvatarProvider")
	}
	return ctx
}

export default useAvatarContext
