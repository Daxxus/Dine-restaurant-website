import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../Contexts/useAuthContext"
// import useCountdownContext from "../../Contexts/useCountdownContext"

const useReservations = () => {
	const { clientId } = useAuthContext()
	const { data: reservations, isLoading: loading } = useQuery({
		queryKey: ["reservations", clientId],
		queryFn: () =>
<<<<<<< HEAD
			fetch(
				`http://localhost:3000/reservations?clientId=${clientId}`
			).then((res) => res.json()),
=======
			fetch(`https://mulberry-thirsty-hide.glitch.me/reservations?clientId=${clientId}`).then(
				(res) => res.json()
			),
>>>>>>> 10c0d108e818b594454bd7433696e9a5fdacd759
	})

	return { reservations, loading }
}

export default useReservations
