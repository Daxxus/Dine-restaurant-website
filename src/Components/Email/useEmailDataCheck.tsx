import axios from "axios"

const useEmailDataCheck = () => {
	const verifyMailAvilable = async (email: string) => {
		const isAvilable = await axios
			.get(`https://test-json-gamma.vercel.app/clients?email=${email}`)
			.then((resp) => {
				const { data } = resp

				return data.length === 0 
			})
		return isAvilable
	}

	return { verifyMailAvilable } 
}

export default useEmailDataCheck
