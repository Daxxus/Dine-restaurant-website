import useCountdownContext from "../../Contexts/useCountdownContext"
import { Text, Box, Flex } from "@chakra-ui/react"
import style from "./Counting.module.css"

const Counting = () => {
	const { secondsLeft } = useCountdownContext()

	const days = Math.trunc(secondsLeft / 60 / 60 / 24)
	const hrs = Math.trunc((secondsLeft / 60 / 60) % 24)
	const mins = Math.trunc((secondsLeft / 60) % 60)
	const secs = Math.trunc(secondsLeft % 60)

	// secondsLeft > 0 && `(${secondsLeft})`

	return (
		<Box>
			{secondsLeft > 0 ? (
				<Flex flexFlow={"column "} textAlign={"center"} minW={100}>
					<Text as={"cite"}>Your visit is only</Text>
					<Text as={"cite"}>
						<b className={style.font}>{days} </b> days
						<b className={style.font}> {hrs}</b> hrs
						<b className={style.font}> {mins}</b> mins
						<b className={style.font}> {secs} </b>secs away
					</Text>
				</Flex>
			) : (
				<Text as='b' fontSize={"2xl"} color={"lime"}>
					Time's up to Your visit!
				</Text>
			)}
		</Box>
	)
}

export default Counting
