import React, { createContext, useState, Dispatch } from "react"

interface AvatarContextProps {
	avatar: string
	setAvatar: Dispatch<React.SetStateAction<string>>
}

export const AvatarContext = createContext<AvatarContextProps | null>(null)
export const AvatarProvider = ({ children }: { children: React.ReactNode }) => {
	const [avatar, setAvatar] = useState("")
	return (
		<AvatarContext.Provider value={{ avatar, setAvatar }}>
			{children}
		</AvatarContext.Provider>
	)
}

export default AvatarContext
