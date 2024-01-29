import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../Contexts/useAuthContext"

const useOrders = () => {
	const { clientId } = useAuthContext()
	const {
		data: orders,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["clientOrders", clientId],
		queryFn: () =>
<<<<<<< HEAD
			fetch(
				`http://localhost:3000/clientOrders?clientId=${clientId}`
			).then((response) => response.json()),
		enabled: clientId !== "",
=======
			fetch(`https://mulberry-thirsty-hide.glitch.me/clientOrders?clientId=${clientId}`).then(
				(response) => response.json()
			),
		enabled: clientId!==""
>>>>>>> 10c0d108e818b594454bd7433696e9a5fdacd759
	})

	return { orders, isLoading, error }
}

export default useOrders
