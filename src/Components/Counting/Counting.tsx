import useCountdownContext from "../../Contexts/useCountdownContext"
import { Text, Box, Flex } from "@chakra-ui/react"
import style from "./Counting.module.css"
import useReservations from "../Clients/useReservations"
import { useEffect } from "react"

const Counting = () => {
	const { reservations } = useReservations()
	const { secondsLeft, setSecondsLeft } = useCountdownContext()
	const days = Math.trunc(secondsLeft / 60 / 60 / 24)
	const hrs = Math.trunc((secondsLeft / 60 / 60) % 24)
	const mins = Math.trunc((secondsLeft / 60) % 60)
	const secs = Math.trunc(secondsLeft % 60)
	// const current = new Date().toLocaleDateString()

	useEffect(() => {
		if (reservations) {
			const closestDay = reservations?.sort(
				(
					a: { date: string | number | Date },
					b: { date: string | number | Date }
				) => {
					// console.log(new Date(a.date))
					// console.log(new Date(b.date))
					new Date(a.date) - new Date(b.date)
				}
			)[reservations.length - 1]

			console.log("clostest date", closestDay)

			if (closestDay) {
				const currentTime = new Date().getTime()
				const finalTime = new Date(closestDay.date)
				const timeDiffrence = (finalTime - currentTime) / 1000
				setSecondsLeft(timeDiffrence)
			} else {
				setSecondsLeft(0)
			}
		}
	}, [reservations, setSecondsLeft])

	// secondsLeft > 0 && `(${secondsLeft})`

	return (
		<Box>
			{secondsLeft > 0 ? (
				<Flex>
					<Text as={"cite"}>Your visit is only</Text>
					<Text as={"cite"}>
						<b className={style.font}>{days} </b> days
						<b className={style.font}> {hrs}</b> hrs
						<b className={style.font}> {mins}</b> mins
						<b className={style.font}> {secs} </b>secs away
					</Text>
				</Flex>
			) : reservations?.length > 0 ? (
				<Text as='b' color={"teal"}>
					Time's up to Your visit!
				</Text>
			) : null}
		</Box>
	)
}

export default Counting
