import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../Contexts/useAuthContext"
// import useCountdownContext from "../../Contexts/useCountdownContext"

const useReservations = () => {
	const { clientId } = useAuthContext()	
	const { data: reservations, isLoading: loading } = useQuery({
		queryKey: ["reservations", clientId],
		queryFn: () =>
			fetch(`http://localhost:3000/reservations?clientId=${clientId}`).then(
				(res) => res.json()
			),
	})

	return { reservations, loading }
}

export default useReservations
