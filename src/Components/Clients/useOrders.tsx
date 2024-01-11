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
			fetch(
				`http://localhost:3000/clientOrders?clientId=${clientId}`
			).then((response) => response.json()),
		enabled: clientId !== "",
	})

	return { orders, isLoading, error }
}

export default useOrders
