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

	// if (isLoading) <p>Loading...</p>
	// if (error) <p>Can not get reservations </p>
	// if (!orders) <p>No data...</p>

	return { orders, isLoading, error }
}

export default useOrders
