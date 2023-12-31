import React, { createContext, useState, Dispatch } from "react"

interface AuthContextProps {
	isAuth: boolean
	setIsAuth: Dispatch<React.SetStateAction<boolean>>
	clientId: string
	setClientId: Dispatch<React.SetStateAction<string>>
	totalPrice: number
	setTotalPrice: Dispatch<React.SetStateAction<number>>
	mealNumber:number
	setMealNumber: Dispatch<React.SetStateAction<number>>
}

export const AuthenticateContext = createContext<AuthContextProps | null>(null)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false)
	const [clientId, setClientId] = useState("")
	const [totalPrice, setTotalPrice] = useState(0)
	const [mealNumber, setMealNumber] = useState(1)
	return (
		<AuthenticateContext.Provider
			value={{
				isAuth,
				setIsAuth,
				clientId,
				setClientId,
				totalPrice,
				setTotalPrice,
				mealNumber,
				setMealNumber
			}}>
			{children}
		</AuthenticateContext.Provider>
	)
}

export default AuthenticateContext
