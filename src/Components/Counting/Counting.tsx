import useCountdownContext from "../../Contexts/useCountdownContext"
import { Text, Box, Flex } from "@chakra-ui/react"
import style from "./Counting.module.css"
import useReservations from "../Clients/useReservations"

const Counting = () => {
	const { reservations } = useReservations()
	const { secondsLeft } = useCountdownContext()
	const days = Math.trunc(secondsLeft / 60 / 60 / 24)
	const hrs = Math.trunc((secondsLeft / 60 / 60) % 24)
	const mins = Math.trunc((secondsLeft / 60) % 60)
	const secs = Math.trunc(secondsLeft % 60)
	const current = new Date().toLocaleDateString()
	const dayMatching = reservations?.find((el) => el.orderDate === current)
	
	// 	no to teraz jakoś trzeba znaleźć datę rezerwacji najbliższą dzisiejszej
	// albo zrobić counting tylko wtedy jeśli rezerwacja jest z dziś

	// secondsLeft > 0 && `(${secondsLeft})`
	
	return (
		<Box>
			{secondsLeft > 0 ? (
				reservations?.length > 0 && (
					<Flex>
						<Text as={"cite"}>Your visit is only</Text>
						<Text as={"cite"}>
							<b className={style.font}>{days} </b> days
							<b className={style.font}> {hrs}</b> hrs
							<b className={style.font}> {mins}</b> mins
							<b className={style.font}> {secs} </b>secs away
						</Text>
					</Flex>
				)
			) : (
				<Text as='b' color={"teal"}>
					Time's up to Your visit!
				</Text>
			)}
		</Box>
	)
}

export default Counting
