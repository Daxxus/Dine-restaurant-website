import React, { createContext, useState, Dispatch } from "react"

interface AuthContextProps {
	isAuth: boolean
	setIsAuth: Dispatch<React.SetStateAction<boolean>>
}

export const AuthenticateContext = createContext<AuthContextProps | null>(null)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false)
	return (
		<AuthenticateContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthenticateContext.Provider>
	)
}

export default AuthenticateContext
