import { useQuery } from "@tanstack/react-query"

const useReservations = () => {
	const {
		data: reservations,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["reservations"],
		queryFn: () =>
			fetch("http://localhost:3000/reservations").then((res) => res.json()),
	})

	if (isLoading) <p>Loading...</p>
	if (error) <p>Can not get reservations </p>
	if (!reservations) <p>No data...</p>

	return reservations
}

export default useReservations
