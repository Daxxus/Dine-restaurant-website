import axios from "axios"

const useEmailDataCheck = () => {
	const verifyMailAvilable = async (email: string) => {
		const isAvilable = await axios
			.get(`http://localhost:3000/clients?email=${email}`)
			.then((resp) => {
				const { data } = resp

				return data.length === 0 //nie zajety adres czyli brak takowego adresu gdy 1 czyli taki 1 obiekt z tym adresem email widnieje w tablicy
			})
		return isAvilable
	}

	return { verifyMailAvilable } 
}

export default useEmailDataCheck
