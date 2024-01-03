import { useEffect } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

const ProtectWrapper = ({ children }: { children: React.ReactNode }) => {
	const { isAuth } = useAuthContext() //jak w login
	const navigate = useNavigate()
	// console.log("isAuth", isAuth)

	useEffect(() => {
		!isAuth ? navigate("/login") : null
	}, [isAuth, navigate])
	return <>{children}</> 
}
export default ProtectWrapper//musi być defaultowo
