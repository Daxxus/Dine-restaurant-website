import { useQuery } from "@tanstack/react-query"

const useClients = () => {
	const {
		data: clientId,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["clients"],
		queryFn: () =>
			fetch("https://mulberry-thirsty-hide.glitch.me/clients").then((res) => res.json()),
	})
	if (error) {
		return <p>Can not get orders</p>
	}
	if (isLoading) {
		return <p>Loading...</p>
	}
	if (!clientId) {
		return <p>No data...</p>
	}

	return clientId
}

export default useClients
