import { useQuery } from "@tanstack/react-query"

const useOrders = () => {
    const { data: orders, isLoading, error } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			fetch(`http://localhost:3000/orders`).then((response) => response.json()),
	})

	if (isLoading) <p>Loading...</p>
	if (error) <p>Can not get reservations </p>
	if (!orders) <p>No data...</p>

	return orders
}

export default useOrders
