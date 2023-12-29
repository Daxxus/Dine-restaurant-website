import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../Contexts/useAuthContext"

const useOrders = () => {
	const { clientId } = useAuthContext()
	const {
		data: orders,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["orders", clientId],
		queryFn: () =>
			fetch(`http://localhost:3000/orders?clientId=${clientId}`).then(
				(response) => response.json()
			),
	})

	return { orders, isLoading, error }
}

export default useOrders
