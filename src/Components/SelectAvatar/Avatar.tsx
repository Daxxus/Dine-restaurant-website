import { useEffect, useState } from "react"

interface Avatar {
	pic: string
	id: number
}

export const useAvatar = () => {
	const [avatars, setAvatars] = useState<Avatar[]>([])

	const getAvatars = async () => {
		const URL = "http://localhost:3000/avatars"
		const download = await fetch(URL)
		if (!download) {
			return []
		}
		const data = await download.json()
		setAvatars(data)
	}
	useEffect(() => {
		getAvatars()
	}, [])

	return avatars
}
